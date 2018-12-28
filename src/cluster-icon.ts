import { ClusterConfig, ClusterOption } from './cluster-type';

export default class ClusterIcon {
  clusterOption: ClusterOption;
  center: Y.LatLng = new Y.LatLng(0, 0);
  map: Y.Map;
  marker: Y.Marker | null = null;
  constructor(map: Y.Map, clusterOption: ClusterOption) {
    this.clusterOption = clusterOption;
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
    
  } 
}