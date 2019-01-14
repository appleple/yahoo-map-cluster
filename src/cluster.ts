import ClusterIcon from './cluster-icon'
import { ClusterConfig, ClusterOption } from './cluster-type';

const defaults = {
  gridSize: 60,
  minClusterSize: 2,
  maxZoom: null,
  imagePath: '../images/cluster/'
}

export default class Cluster {
  markers: Y.Marker[] = [];
  private center: Y.LatLng | null = null;
  private bounds: Y.LatLngBounds | null = null;
  private gridSize: number;
  private map: Y.Map;
  private option: ClusterConfig;
  private clusterIcon: ClusterIcon;

  constructor(map: Y.Map, option: ClusterOption) {
    const opt = Object.assign({}, defaults, option);
    this.map = map;
    this.gridSize = opt.gridSize;
    this.option = opt;
    this.clusterIcon = new ClusterIcon(this.map, this, this.option);
  }

  private calculateBounds() {
    if (this.center) {
      const bounds = new Y.LatLngBounds(this.center, this.center);
      this.bounds = this.getExtendedBounds(bounds);
    }
  }

  private getExtendedBounds(bounds: Y.LatLngBounds): Y.LatLngBounds {
    const { map } = this;
    const zoom = map.getZoom();
    const projection = this.map.getProjection();
    const tr = new Y.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
    const bl = new Y.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
    const trPix = projection.fromLatLngToPixel(tr, zoom);
    trPix.x += this.gridSize;
    trPix.y -= this.gridSize;

    const blPix = projection.fromLatLngToPixel(bl, zoom);
    blPix.x -= this.gridSize;
    blPix.y += this.gridSize;

    // Convert the pixel points back to LatLng
    const ne = projection.fromPixelToLatLng(trPix, zoom);
    const sw = projection.fromPixelToLatLng(blPix, zoom);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);
    return bounds;
  }

  public getCenter() {
    return this.center;
  }

  public getBounds() {
    return this.bounds;
  }

  public addMarker(marker: Y.Marker) {
    const { option, map } = this;
    const { minClusterSize } = option;

    if (this.isMarkerAlreadyAdded(marker)) {
      return false;
    }
    if (!this.center) {
      this.center = marker.getLatLng();
    } else {
      const l = this.markers.length + 1;
      const lat = (this.center.lat() * (l - 1) + marker.getLatLng().lat()) / l;
      const lng = (this.center.lng() * (l - 1) + marker.getLatLng().lng()) / l;
      this.center = new Y.LatLng(lat, lng);
    }
    this.calculateBounds();
    this.markers.push(marker);

    const len = this.markers.length;
    if (len < minClusterSize) {
      map.addFeature(marker);
    }
    if (len === minClusterSize) {
      for (let i = 0; i < len; i++) {
        map.removeFeature(this.markers[i]);
      }
    }
    if (len >= minClusterSize) {
      map.removeFeature(marker);
    }
    this.updateIcon();
  }

  public isMarkerInClusterBounds(marker: Y.Marker): boolean {
    if (this.bounds) {
      return this.bounds.containsLatLng(marker.getLatLng());
    }
    return false;
  }

  public isMarkerAlreadyAdded(marker: Y.Marker) {
    const find = this.markers.find((m) => {
      if (m === marker) {
        return true;
      }
      return false;
    })
    return find ? true : false;
  }

  public getMaxZoom() {
    return this.option.maxZoom;
  }

  public hide() {
    this.clusterIcon.hide();
  }

  public updateIcon() {
    const zoom = this.map.getZoom();
    const maxZoom = this.getMaxZoom();
    if (maxZoom && zoom > maxZoom) {
      this.markers.forEach((marker) => {
        this.map.addFeature(marker);
      });
      return;
    }
    if (this.markers.length < this.option.minClusterSize) {
      this.clusterIcon.hide();
      return;
    }
    const sums = this.markers.length;
    this.clusterIcon.setSums(sums);
    if (this.center) {
      this.clusterIcon.setCenter(this.center);
    }
    this.clusterIcon.show();
  }
}