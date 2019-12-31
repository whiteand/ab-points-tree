import { tree as getTree } from './tree';
import { ITree } from './types';

function _append<Point extends number[]>(
  tree: ITree<Point> | null,
  point: Point,
): ITree<Point> {
  if (!tree) {
    const ranges = point.map(value => [value, value] as [number, number]);
    return getTree(point, ranges, null, null);
  }

  const headX = tree.point[0];
  const pointX = point[0];
  const ranges = Array(point.length);

  if (headX === pointX) {
    ranges[0] = tree.ranges[0];

    for (let i = 1; i < point.length; i++) {
      const leftRange = tree.left ? tree.left.ranges[i] : null;
      const rightRange = tree.right ? tree.right.ranges[i] : null;
      const y = point[i];
      let minY = y;
      let maxY = y;

      if (leftRange) {
        if (leftRange[0] < minY) {
          minY = leftRange[0];
        }
        if (leftRange[1] > maxY) {
          maxY = leftRange[1];
        }
      }

      if (rightRange) {
        if (rightRange[0] < minY) {
          minY = rightRange[0];
        }
        if (rightRange[1] > maxY) {
          maxY = rightRange[1];
        }
      }

      ranges[i] = [minY, maxY];
    }

    return getTree(point, ranges, tree.left, tree.right);
  }
  if (headX > pointX) {
    const newLeft = append(tree.left, point);

    for (let i = 0; i < point.length; i++) {
      let minY = tree.point[i];
      let maxY = tree.point[i];
      const leftRange = newLeft.ranges[i];
      const rightRange = tree.right ? tree.right.ranges[i] : null;
      if (leftRange[0] < minY) {
        minY = leftRange[0];
      }
      if (leftRange[1] > maxY) {
        maxY = leftRange[1];
      }
      if (rightRange) {
        if (rightRange[0] < minY) {
          minY = rightRange[0];
        }
        if (rightRange[1] > maxY) {
          maxY = rightRange[1];
        }
      }
      ranges[i] = [minY, maxY];
    }

    return getTree(tree.point, ranges, newLeft, tree.right);
  }
  const newRight = append(tree.right, point);

  for (let i = 0; i < point.length; i++) {
    let minY = tree.point[i];
    let maxY = tree.point[i];
    const leftRange = tree.left ? tree.left.ranges[i] : null;
    const rightRange = newRight.ranges[i];
    if (leftRange) {
      if (leftRange[0] < minY) {
        minY = leftRange[0];
      }
      if (leftRange[1] > maxY) {
        maxY = leftRange[1];
      }
    }
    if (rightRange[0] < minY) {
      minY = rightRange[0];
    }
    if (rightRange[1] > maxY) {
      maxY = rightRange[1];
    }
    ranges[i] = [minY, maxY];
  }

  return getTree(tree.point, ranges, tree.left, newRight);
}

export function append<Point extends number[]>(
  tree: ITree<Point> | null,
  ...points: Point[]
): ITree<Point> {
  let res = _append(tree, points[0]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    res = _append(res, point);
  }
  return res;
}
