import Cluster from './cluster';
import { append } from './lib';
/// <reference path="global.d.ts" />
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
            var inject = this.options.injectStyle ? this.options.injectStyle() : '';
            var html = inject ? inject : "\n      .ymap-cluster-label {\n        z-index: 2;\n        font-size: 14px;\n        width: 30px;\n        text-align: center;\n        position: absolute;\n        top: -13px;\n        left: -15px;\n        margin: 0 !important;\n        font-family: Hiragino Kaku Gothic Pro\",\"\u30D2\u30E9\u30AE\u30CE\u89D2\u30B4 Pro W3\",Meiryo,\"\u30E1\u30A4\u30EA\u30AA\",\"\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF\",\"MS PGothic\",Verdana,sans-serif;\n      }\n      .ymap-cluster-icon {\n        margin-top: -28px !important;\n        z-index: 0 !important;\n      }\n      ";
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