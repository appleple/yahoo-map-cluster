var ClusterIcon = /** @class */ (function () {
    function ClusterIcon(map, cluster, clusterOption) {
        this.center = new Y.LatLng(0, 0);
        this.marker = null;
        this.label = null;
        this.clusterOption = clusterOption;
        this.cluster = cluster;
        this.map = map;
        this.sums = 0;
    }
    ClusterIcon.prototype.setSums = function (sums) {
        this.sums = sums;
    };
    ClusterIcon.prototype.hide = function () {
        if (this.marker) {
            this.map.removeFeature(this.marker);
        }
        if (this.label) {
            this.map.removeFeature(this.label);
        }
    };
    ClusterIcon.prototype.setCenter = function (center) {
        this.center = center;
    };
    ClusterIcon.prototype.getClusterSize = function () {
        var sums = this.sums;
        var i = 1;
        while (sums / 10 >= 1) {
            sums = sums / 10;
            i++;
        }
        return i;
    };
    ClusterIcon.prototype.show = function () {
        if (this.marker) {
            this.map.removeFeature(this.marker);
        }
        if (this.label) {
            this.map.removeFeature(this.label);
        }
        var size = this.clusterOption.getClusterSize ? this.clusterOption.getClusterSize(this.sums) : this.getClusterSize();
        var icon = new Y.Icon("" + this.clusterOption.imagePath + size + ".png", {
            iconSize: new Y.Size(53, 52),
            className: 'ymap-cluster-icon'
        });
        this.marker = new Y.Marker(this.center, { icon: icon });
        this.map.addFeature(this.marker);
        this.label = new Y.Label(this.center, "" + this.sums, {
            className: 'ymap-cluster-label'
        });
        this.map.addFeature(this.label);
        this.onAdd(this.marker);
    };
    ClusterIcon.prototype.onAdd = function (marker) {
        var _this = this;
        if (this.marker) {
            this.marker.bind('click', function () {
                var center = _this.cluster.getCenter();
                var bounds = _this.cluster.getBounds();
                if (bounds && center) {
                    var zoomLevel = _this.map.getBoundsZoomLevel(bounds);
                    _this.map.setZoom(zoomLevel, true, center, true);
                }
            });
        }
        if (this.label) {
            this.label.bind('click', function () {
                var center = _this.cluster.getCenter();
                var bounds = _this.cluster.getBounds();
                if (bounds && center) {
                    var zoomLevel = _this.map.getBoundsZoomLevel(bounds);
                    _this.map.setZoom(zoomLevel, true, center, true);
                }
            });
        }
    };
    return ClusterIcon;
}());
export default ClusterIcon;
//# sourceMappingURL=cluster-icon.js.map