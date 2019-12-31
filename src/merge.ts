import { append } from './append';
import { Queue } from './queue';
import { ITree } from './types';

export function merge<Point extends number[]>(
  t1: ITree<Point> | null,
  t2: ITree<Point> | null,
) {
  if (!t1) {
    return t2;
  }
  if (!t2) {
    return t1;
  }

  const queue = new Queue<ITree<Point>>();

  queue.push(t2);

  let newTree = t1;

  while (queue.length > 0) {
    const t = queue.pop();

    newTree = append(newTree, t.point);

    if (t.left) {
      queue.push(t.left);
    }
    if (t.right) {
      queue.push(t.right);
    }
  }

  return newTree;
}
