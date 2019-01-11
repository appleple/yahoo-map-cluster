import { ClusterOption } from './cluster-type';
export default class Cluster {
    markers: Y.Marker[];
    private center;
    private bounds;
    private gridSize;
    private map;
    private option;
    private clusterIcon;
    constructor(map: Y.Map, option: ClusterOption);
    private calculateBounds;
    private getExtendedBounds;
    getCenter(): Y.LatLng | null;
    getBounds(): Y.LatLngBounds | null;
    addMarker(marker: Y.Marker): false | undefined;
    isMarkerInClusterBounds(marker: Y.Marker): boolean;
    isMarkerAlreadyAdded(marker: Y.Marker): boolean;
    getMaxZoom(): number | null;
    hide(): void;
    updateIcon(): void;
}
