import ClusterIcon from './cluster-icon';
/// <reference path="./global.d.ts" />
var defaults = {
    gridSize: 60,
    minClusterSize: 2,
    maxZoom: null,
    imagePath: 'https://appleple.github.io/yahoo-map-cluster/images/cluster/'
};
var Cluster = /** @class */ (function () {
    function Cluster(map, option) {
        this.markers = [];
        this.center = null;
        this.bounds = null;
        var opt = Object.assign({}, defaults, option);
        this.map = map;
        this.gridSize = opt.gridSize;
        this.option = opt;
        this.clusterIcon = new ClusterIcon(this.map, this, this.option);
    }
    Cluster.prototype.calculateBounds = function () {
        if (this.center) {
            var bounds = new Y.LatLngBounds(this.center, this.center);
            this.bounds = this.getExtendedBounds(bounds);
        }
    };
    Cluster.prototype.getExtendedBounds = function (bounds) {
        var map = this.map;
        var zoom = map.getZoom();
        var projection = this.map.getProjection();
        var tr = new Y.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng());
        var bl = new Y.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng());
        var trPix = projection.fromLatLngToPixel(tr, zoom);
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;
        var blPix = projection.fromLatLngToPixel(bl, zoom);
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;
        // Convert the pixel points back to LatLng
        var ne = projection.fromPixelToLatLng(trPix, zoom);
        var sw = projection.fromPixelToLatLng(blPix, zoom);
        // Extend the bounds to contain the new bounds.
        bounds.extend(ne);
        bounds.extend(sw);
        return bounds;
    };
    Cluster.prototype.getCenter = function () {
        return this.center;
    };
    Cluster.prototype.getBounds = function () {
        return this.bounds;
    };
    Cluster.prototype.addMarker = function (marker) {
        var _a = this, option = _a.option, map = _a.map;
        var minClusterSize = option.minClusterSize;
        if (this.isMarkerAlreadyAdded(marker)) {
            return false;
        }
        if (!this.center) {
            this.center = marker.getLatLng();
        }
        else {
            var l = this.markers.length + 1;
            var lat = (this.center.lat() * (l - 1) + marker.getLatLng().lat()) / l;
            var lng = (this.center.lng() * (l - 1) + marker.getLatLng().lng()) / l;
            this.center = new Y.LatLng(lat, lng);
        }
        this.calculateBounds();
        this.markers.push(marker);
        var len = this.markers.length;
        if (len < minClusterSize) {
            map.addFeature(marker);
        }
        if (len === minClusterSize) {
            for (var i = 0; i < len; i++) {
                map.removeFeature(this.markers[i]);
            }
        }
        if (len >= minClusterSize) {
            map.removeFeature(marker);
        }
        this.updateIcon();
    };
    Cluster.prototype.isMarkerInClusterBounds = function (marker) {
        if (this.bounds) {
            return this.bounds.containsLatLng(marker.getLatLng());
        }
        return false;
    };
    Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
        var find = this.markers.find(function (m) {
            if (m === marker) {
                return true;
            }
            return false;
        });
        return find ? true : false;
    };
    Cluster.prototype.getMaxZoom = function () {
        return this.option.maxZoom;
    };
    Cluster.prototype.hide = function () {
        this.clusterIcon.hide();
    };
    Cluster.prototype.updateIcon = function () {
        var _this = this;
        var zoom = this.map.getZoom();
        var maxZoom = this.getMaxZoom();
        if (maxZoom && zoom > maxZoom) {
            this.markers.forEach(function (marker) {
                _this.map.addFeature(marker);
            });
            return;
        }
        if (this.markers.length < this.option.minClusterSize) {
            this.clusterIcon.hide();
            return;
        }
        var sums = this.markers.length;
        this.clusterIcon.setSums(sums);
        if (this.center) {
            this.clusterIcon.setCenter(this.center);
        }
        this.clusterIcon.show();
    };
    return Cluster;
}());
export default Cluster;
//# sourceMappingURL=cluster.js.map