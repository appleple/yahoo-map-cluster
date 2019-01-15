import Cluster from './cluster';
import { append } from './lib';
var YmapCluster = /** @class */ (function () {
    function YmapCluster(map, markers, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.clusters = [];
        this.markers = markers;
        this.map = map;
        this.options = options;
        this.createClusters();
        this.map.bind('zoomend', function () {
            _this.update();
        });
        this.appendStyle();
    }
    YmapCluster.prototype.appendStyle = function () {
        var body = document.querySelector('body');
        if (body) {
            append(body, "<style id=\"ymap-cluster\"></style>");
            var style = document.querySelector('#ymap-cluster');
            var html = "\n      .ymap-cluster-label {\n        z-index: 2;\n        font-size: 12px;\n        width: 30px;\n        text-align: center;\n        position: absolute;\n        top: -10px;\n        left: -15px;\n      }\n      .ymap-cluster-icon {\n        margin-top: -16px !important;\n        z-index: 0 !important;\n      }\n      ";
            if (style) {
                style.innerHTML = html;
            }
        }
    };
    YmapCluster.prototype.createClusters = function () {
        var _this = this;
        var markers = this.markers;
        markers.forEach(function (marker) {
            _this.addToClosestCluster(marker);
        });
    };
    YmapCluster.prototype.distanceBetweenPoints = function (p1, p2) {
        var R = 6371; // Radius of the Earth in km
        var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
        var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    YmapCluster.prototype.getClosestCluster = function (marker) {
        var _this = this;
        var distance = Infinity;
        var closestCluster = null;
        var clusters = this.clusters;
        clusters.forEach(function (cluster) {
            var center = cluster.getCenter();
            if (center) {
                var d = _this.distanceBetweenPoints(center, marker.getLatLng());
                if (d < distance) {
                    distance = d;
                    closestCluster = cluster;
                }
            }
        });
        return closestCluster;
    };
    YmapCluster.prototype.addToClosestCluster = function (marker) {
        var _a = this, clusters = _a.clusters, options = _a.options;
        var closestCluster = this.getClosestCluster(marker);
        if (closestCluster && closestCluster.isMarkerInClusterBounds(marker)) {
            closestCluster.addMarker(marker);
        }
        else {
            var cluster = new Cluster(this.map, options);
            cluster.addMarker(marker);
            this.clusters.push(cluster);
        }
    };
    YmapCluster.prototype.update = function () {
        var _this = this;
        this.clusters.forEach(function (cluster) {
            cluster.hide();
        });
        this.clusters = [];
        var markers = this.markers;
        markers.forEach(function (marker) {
            _this.map.removeFeature(marker);
        });
        this.createClusters();
    };
    YmapCluster.prototype.addMarker = function (marker, draw) {
        if (draw) {
            this.markers.push(marker);
            this.update();
        }
    };
    return YmapCluster;
}());
export default YmapCluster;
//# sourceMappingURL=index.js.map