export interface ClusterConfig {
    gridSize: number;
    minClusterSize: number;
    maxZoom: number | null;
    imagePath: string;
    injectStyle?: () => string;
    getClusterSize?: (sums: number) => number;
}
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export declare type ClusterOption = Partial<ClusterConfig>;
export {};
