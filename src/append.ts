import { tree as getTree } from './tree';
import { ITree } from './types';

function _append<Point extends number[]>(
  tree: ITree<Point> | null,
  point: Point,
): ITree<Point> {
  const ranges: [number, number][] = [];
  if (!tree) {
    for (let i = 0; i < point.length; i++) {
      const x = point[i];
      ranges.push([x, x]);
    }
    return getTree(point, ranges, null, null);
  }

  const headX = tree.point[0];
  const pointX = point[0];

  if (headX === pointX) {
    ranges.push(tree.ranges[0]);

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

      ranges.push([minY, maxY]);
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
      ranges.push([minY, maxY]);
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
    ranges.push([minY, maxY]);
  }

  return getTree(tree.point, ranges, tree.left, newRight);
}
function _mutappend<Point extends number[]>(
  tree: ITree<Point> | null,
  point: Point,
): ITree<Point> {
  const ranges: [number, number][] = [];
  if (!tree) {
    for (let i = 0; i < point.length; i++) {
      const x = point[i];
      ranges.push([x, x]);
    }
    return getTree(point, ranges, null, null);
  }

  const headX = tree.point[0];
  const pointX = point[0];

  if (headX === pointX) {
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

      tree.ranges[i][0] = minY;
      tree.ranges[i][1] = maxY;
    }

    tree.point = point;

    return tree;
  }
  if (headX > pointX) {
    const newLeft = _mutappend(tree.left, point);

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
      tree.ranges[i][0] = minY;
      tree.ranges[i][1] = maxY;
    }
    tree.left = newLeft;
    return tree;
  }
  const newRight = _mutappend(tree.right, point);

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
    tree.ranges[i][0] = minY;
    tree.ranges[i][1] = maxY;
  }

  tree.right = newRight;

  return tree;
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
export function mutappend<Point extends number[]>(
  tree: ITree<Point> | null,
  ...points: Point[]
): ITree<Point> {
  let res = _mutappend(tree, points[0]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    res = _mutappend(res, point);
  }
  return res;
}
