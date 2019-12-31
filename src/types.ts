export interface ITree<Point extends number[]> {
  point: Point;
  ranges: Array<[number, number]>;
  left: ITree<Point> | null;
  right: ITree<Point> | null;
}
