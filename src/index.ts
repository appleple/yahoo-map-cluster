import Cluster from './cluster';
import { append } from './lib';
import { ClusterOption } from './cluster-type';

export default class YmapCluster {
  markers: Y.Marker[];
  map: Y.Map;
  clusters: Cluster[] = [];
  options: ClusterOption;

  constructor(map: Y.Map, markers: Y.Marker[], options: ClusterOption = {}) {
    this.markers = markers;
    this.map = map;
    this.options = options;
    this.createClusters();
    this.map.bind('zoomend', () => {
      this.update();
    });
    this.appendStyle();
  }

  private appendStyle() {
    const body = document.querySelector('body');
    if (body) {
      append(body, `<style id="ymap-cluster"></style>`);
      const style = document.querySelector('#ymap-cluster');
      const inject = this.options.injectStyle ? this.options.injectStyle() : '';
      const html = inject ? inject : `
      .ymap-cluster-label {
        z-index: 2;
        font-size: 14px;
        width: 30px;
        text-align: center;
        position: absolute;
        top: -14px;
        left: -15px;
        font-family: Hiragino Kaku Gothic Pro","ヒラギノ角ゴ Pro W3",Meiryo,"メイリオ","ＭＳ Ｐゴシック","MS PGothic",Verdana,sans-serif;
      }
      .ymap-cluster-icon {
        margin-top: -16px !important;
        z-index: 0 !important;
      }
      `;
      if (style) {
        style.innerHTML = html;
      }
    }
  }

  private createClusters() {
    const { markers } = this;
    markers.forEach((marker) => {
      this.addToClosestCluster(marker);
    });
  }

  private distanceBetweenPoints(p1: Y.LatLng, p2: Y.LatLng) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
    const dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  private getClosestCluster(marker: Y.Marker): Cluster | null {
    let distance = Infinity;
    let closestCluster = null;
    const { clusters } = this;
    clusters.forEach((cluster) => {
      const center = cluster.getCenter();
      if (center) {
        const d = this.distanceBetweenPoints(center, marker.getLatLng());
        if (d < distance) {
          distance = d;
          closestCluster = cluster;
        }
      }
    });
    return closestCluster;
  }

  private addToClosestCluster(marker: Y.Marker) {
    const { clusters, options } = this;
    const closestCluster = this.getClosestCluster(marker);
    if (closestCluster && closestCluster.isMarkerInClusterBounds(marker)) {
      closestCluster.addMarker(marker);
    } else {
      const cluster = new Cluster(this.map, options);
      cluster.addMarker(marker);
      this.clusters.push(cluster);
    }
  }

  public update() {
    this.clusters.forEach((cluster) => {
      cluster.hide();
    });
    this.clusters = [];
    const { markers } = this;
    markers.forEach((marker) => {
      this.map.removeFeature(marker);
    });
    this.createClusters();
  }

  public addMarker(marker: Y.Marker, draw?: boolean) {
    if (draw) {
      this.markers.push(marker);
      this.update();
    }
  }
}