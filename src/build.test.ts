import { append } from './append';
import { build, mutbuild } from './build';
import { iterate } from './iterate';

describe('build function', () => {
  test('without config returns full tree', () => {
    const tree = build([3, 2, 4, 1, 5], x => [x, x * x]);
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
  test('without config returns tree with each chunk calculated', () => {
    const tree = build([3, 2, 4, 1, 5], x => [x, x * x], { chunkSize: 2 });
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
  test('without config returns tree with each chunk calculated from predicate', () => {
    const tree = build([3, 2, 4, 1, 5], x => [x, x * x], {
      chunkPredicate: point => point[0] < 4,
    });
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
  test('without config returns tree with each chunk calculated from predicate', () => {
    const tree = build([3, 2, 4, 1, 5], x => [x, x * x], {
      chunkPredicate: point => point[0] < 4,
      initialTree: append(null, [10, 100]),
    });
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
});
describe('mutbuild function', () => {
  test('without config returns full tree', () => {
    const tree = mutbuild([3, 2, 4, 1, 5], x => [x, x * x]);
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
  test('without config returns tree with each chunk calculated', () => {
    const tree = mutbuild([3, 2, 4, 1, 5], x => [x, x * x], { chunkSize: 2 });
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
  test('without config returns tree with each chunk calculated from predicate', () => {
    const tree = mutbuild([3, 2, 4, 1, 5], x => [x, x * x], {
      chunkPredicate: point => point[0] < 4,
    });
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
  test('without config returns tree with each chunk calculated from predicate', () => {
    const tree = mutbuild([3, 2, 4, 1, 5], x => [x, x * x], {
      chunkPredicate: point => point[0] < 4,
      initialTree: append(null, [10, 100]),
    });
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
    expect([...iterate(tree.next().value || null)]).toMatchSnapshot();
  });
});
