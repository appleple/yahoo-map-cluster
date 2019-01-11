import { ClusterOption } from './cluster-type';
import YmapCluster from './cluster';
export default class ClusterIcon {
    clusterOption: ClusterOption;
    center: Y.LatLng;
    map: Y.Map;
    cluster: YmapCluster;
    marker: Y.Marker | null;
    constructor(map: Y.Map, cluster: YmapCluster, clusterOption: ClusterOption);
    hide(): void;
    setCenter(center: Y.LatLng): void;
    show(): void;
    onAdd(marker: Y.Marker): void;
}
