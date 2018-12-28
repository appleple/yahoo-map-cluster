export interface ClusterConfig {
  gridSize: number,
  minClusterSize: number,
  maxZoom: number | null
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type ClusterOption = Partial<ClusterConfig>