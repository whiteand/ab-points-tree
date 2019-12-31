export interface ITree<Point extends number[]> {
  point: Point;
  ranges: Array<[number, number]>;
  left: ITree<Point> | null;
  right: ITree<Point> | null;
}
export interface IBuildConfig<Point extends number[]> {
  // amount of generated points per each generation step
  chunkSize?: number;
  // return true in order to chunk updates
  chunkPredicate?: (
    point: Point,
    index: number,
    tree: ITree<Point>,
    currentChunkSize: number,
  ) => boolean;
  initialTree?: ITree<Point>;
}
