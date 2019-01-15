import { ClusterOption } from './cluster-type';
import YmapCluster from './cluster';
export default class ClusterIcon {
    clusterOption: ClusterOption;
    center: Y.LatLng;
    map: Y.Map;
    cluster: YmapCluster;
    marker: Y.Marker | null;
    label: Y.Label | null;
    sums: number;
    constructor(map: Y.Map, cluster: YmapCluster, clusterOption: ClusterOption);
    setSums(sums: number): void;
    hide(): void;
    setCenter(center: Y.LatLng): void;
    private getClusterSize;
    show(): void;
    onAdd(marker: Y.Marker): void;
}
