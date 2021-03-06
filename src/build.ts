import { append, mutappend } from './append';
import { IBuildConfig } from './types';

export function* build<Point extends number[]>(
  xs: Iterable<number>,
  fn: (x: number) => Point,
  { chunkSize, chunkPredicate, initialTree }: IBuildConfig<Point> = {},
) {
  let index = -1;
  let currentChunkSize = 0;
  let tree = initialTree || null;
  for (const x of xs) {
    index++;
    currentChunkSize++;
    const point = fn(x);
    tree = append(tree, point);
    if (
      (chunkSize !== undefined && currentChunkSize >= chunkSize) ||
      (chunkPredicate && chunkPredicate(point, index, tree, currentChunkSize))
    ) {
      currentChunkSize = 0;
      yield tree;
    }
  }
  if (currentChunkSize > 0) {
    yield tree;
  }
}

export function* mutbuild<Point extends number[]>(
  xs: Iterable<number>,
  fn: (x: number) => Point,
  { chunkSize, chunkPredicate, initialTree }: IBuildConfig<Point> = {},
) {
  let index = -1;
  let currentChunkSize = 0;
  let tree = initialTree || null;
  for (const x of xs) {
    index++;
    currentChunkSize++;
    const point = fn(x);
    tree = mutappend(tree, point);
    if (
      (chunkSize !== undefined && currentChunkSize >= chunkSize) ||
      (chunkPredicate && chunkPredicate(point, index, tree, currentChunkSize))
    ) {
      currentChunkSize = 0;
      yield tree;
    }
  }
  if (currentChunkSize > 0) {
    yield tree;
  }
}
