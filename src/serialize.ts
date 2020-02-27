import { ITree } from './types';

const BOTH = 3;
const LEFT = 1;
const RIGHT = 2;
const NONE = 0;

function serializeSubTree<Point extends number[]>(
  array: number[],
  tree: ITree<Point> | null,
) {
  if (!tree) {
    return;
  }

  const { point, ranges, left, right } = tree;
  // tslint:disable-next-line
  for (let i = 0; i < point.length; i++) {
    array.push(point[i]);
  }
  // tslint:disable-next-line
  for (let i = 0; i < ranges.length; i++) {
    array.push(ranges[i][0], ranges[i][1]);
  }
  if (tree.left && tree.right) {
    array.push(BOTH);
  } else if (tree.left) {
    array.push(LEFT);
  } else if (tree.right) {
    array.push(RIGHT);
  } else {
    array.push(NONE);
  }
  if (left) {
    serializeSubTree(array, left);
  }
  if (right) {
    serializeSubTree(array, right);
  }
}
export function serialize<Point extends number[]>(
  tree: ITree<Point> | null,
): number[] {
  if (!tree) {
    return [];
  }

  const res = [tree.point.length];

  serializeSubTree(res, tree);

  return res;
}

function readSubTree<Point extends number[]>(
  array: number[],
  pointSize: number,
  state: { currentIndex: number },
): ITree<Point> {
  const point: Point = ([] as unknown) as Point;
  for (let i = 0; i < pointSize; i++) {
    point.push(array[state.currentIndex]);
    state.currentIndex++;
  }
  const ranges: Array<[number, number]> = [];
  for (let i = 0; i < pointSize; i++) {
    ranges.push([array[state.currentIndex], array[state.currentIndex + 1]]);
    state.currentIndex += 2;
  }
  const tree: ITree<Point> = {
    left: null,
    point,
    ranges,
    right: null,
  };
  const branchValue = array[state.currentIndex];
  state.currentIndex++;
  if (branchValue === NONE) {
    return tree;
  }
  if (branchValue === BOTH) {
    tree.left = readSubTree(array, pointSize, state);
    tree.right = readSubTree(array, pointSize, state);
  }

  if (branchValue === LEFT) {
    tree.left = readSubTree(array, pointSize, state);
  }
  if (branchValue === RIGHT) {
    tree.right = readSubTree(array, pointSize, state);
  }
  return tree;
}

export function deserialize<Point extends number[]>(
  array: number[],
): ITree<Point> | null {
  if (array.length <= 0) {
    return null;
  }

  const pointSize = array[0];

  return readSubTree(array, pointSize, { currentIndex: 1 });
}
