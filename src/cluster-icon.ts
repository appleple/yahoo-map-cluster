import { ClusterConfig, ClusterOption } from './cluster-type';
import YmapCluster from './cluster';

export default class ClusterIcon {
  clusterOption: ClusterOption;
  center: Y.LatLng = new Y.LatLng(0, 0);
  map: Y.Map;
  cluster: YmapCluster;
  marker: Y.Marker | null = null;
  label: Y.Label | null = null;
  sums: number;
  constructor(map: Y.Map, cluster: YmapCluster, clusterOption: ClusterOption) {
    this.clusterOption = clusterOption;
    this.cluster = cluster;
    this.map = map;
    this.sums = 0;
  }

  setSums(sums: number) {
    this.sums = sums;
  }

  hide() {
    if (this.marker) {
      this.map.removeFeature(this.marker);
    }
    if (this.label) {
      this.map.removeFeature(this.label);
    }
  }

  setCenter(center: Y.LatLng) {
    this.center = center;
  }

  private getClusterSize() {
    let { sums } = this;
    let i = 1;
    while(sums / 10 >= 1) {
      sums = sums / 10;
      i++;
    }
    return i;
  }

  show() {
    if (this.marker) {
      this.map.removeFeature(this.marker);
    }
    if (this.label) {
      this.map.removeFeature(this.label);
    }
    const size = this.clusterOption.getClusterSize ?  this.clusterOption.getClusterSize(this.sums) : this.getClusterSize();
    const icon = new Y.Icon(`${this.clusterOption.imagePath}${size}.png`, {
      iconSize: new Y.Size(53, 52),
      className: 'ymap-cluster-icon'
    });
    this.marker = new Y.Marker(this.center, { icon });
    this.map.addFeature(this.marker);
    this.label = new Y.Label(this.center, `${this.sums}`, {
      className: 'ymap-cluster-label'
    });
    this.map.addFeature(this.label);
    this.onAdd(this.marker)
  }

  onAdd(marker: Y.Marker) {
    if (this.marker) {
      this.marker.bind('click', () => {
        const center = this.cluster.getCenter();
        const bounds = this.cluster.getBounds();
        if (bounds && center) {
          const zoomLevel = this.map.getBoundsZoomLevel(bounds);
          this.map.setZoom(zoomLevel, true, center, true);
        }
      });
    }
    if (this.label) {
      this.label.bind('click', () => {
        const center = this.cluster.getCenter();
        const bounds = this.cluster.getBounds();
        if (bounds && center) {
          const zoomLevel = this.map.getBoundsZoomLevel(bounds);
          this.map.setZoom(zoomLevel, true, center, true);
        }
      });
    }
  } 
}