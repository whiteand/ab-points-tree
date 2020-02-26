import { ITree } from './types';

export function* iterate<Point extends number[]>(
  tree: ITree<Point> | null,
): Generator<Point, void> {
  if (!tree) {
    return;
  }
  yield* iterate(tree.left);
  yield tree.point;
  yield* iterate(tree.right);
}

export function iterateFunc<Point extends number[]>(
  tree: ITree<Point> | null,
  callback: (point: Point) => void,
) {
  if (!tree) return null;

  iterateFunc(tree.left, callback);
  callback(tree.point);
  iterateFunc(tree.right, callback);
}
