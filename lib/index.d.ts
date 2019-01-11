import Cluster from './cluster';
interface ClusterOption {
    gridSize?: number;
    minClusterSize?: number;
}
export default class YmapCluster {
    markers: Y.Marker[];
    map: Y.Map;
    clusters: Cluster[];
    options: ClusterOption;
    constructor(map: Y.Map, markers: Y.Marker[], options?: ClusterOption);
    private createClusters;
    private distanceBetweenPoints;
    private getClosestCluster;
    private addToClosestCluster;
    update(): void;
    addMarker(marker: Y.Marker, draw?: boolean): void;
}
export {};
