import { ClusterConfig, ClusterOption } from './cluster-type';
import YmapCluster from './cluster';

export default class ClusterIcon {
  clusterOption: ClusterOption;
  center: Y.LatLng = new Y.LatLng(0, 0);
  map: Y.Map;
  cluster: YmapCluster;
  marker: Y.Marker | null = null;
  constructor(map: Y.Map, cluster: YmapCluster, clusterOption: ClusterOption) {
    this.clusterOption = clusterOption;
    this.cluster = cluster;
    this.map = map;
  }

  hide() {
    if (this.marker) {
      this.map.removeFeature(this.marker);
    }
  }

  setCenter(center: Y.LatLng) {
    this.center = center;
  }

  show() {
    if (this.marker) {
      this.map.removeFeature(this.marker);
    }
    const icon = new Y.Icon('./images/cluster.png', {
      iconSize: new Y.Size(32, 32),
    });
    this.marker = new Y.Marker(this.center, { icon });
    this.map.addFeature(this.marker);
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
  } 
}