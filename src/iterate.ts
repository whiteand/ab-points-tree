import { ITree } from './types';

export function* iterate<Point extends number[]>(
  tree: ITree<Point> | null,
): Generator<Point, void> {
  if (!tree) return;
  yield* iterate(tree.left);
  yield tree.point;
  yield* iterate(tree.right);
}
