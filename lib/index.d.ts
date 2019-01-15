import Cluster from './cluster';
import { ClusterOption } from './cluster-type';
export default class YmapCluster {
    markers: Y.Marker[];
    map: Y.Map;
    clusters: Cluster[];
    options: ClusterOption;
    constructor(map: Y.Map, markers: Y.Marker[], options?: ClusterOption);
    private appendStyle;
    private createClusters;
    private distanceBetweenPoints;
    private getClosestCluster;
    private addToClosestCluster;
    update(): void;
    addMarker(marker: Y.Marker, draw?: boolean): void;
}
