import { ITree } from './types';

export function tree<Point extends number[]>(
  point: Point,
  ranges: Array<[number, number]>,
  left: ITree<Point> | null,
  right: ITree<Point> | null,
) {
  return {
    left,
    point,
    ranges,
    right,
  };
}
