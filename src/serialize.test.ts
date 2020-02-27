import { build } from './build';
import { deserialize, serialize } from './serialize';

describe('serialize function', () => {
  test('Simple 3d point tree', () => {
    const tree =
      build([3, 2, 4, 1, 5], x => [x], {
        chunkSize: Infinity,
      }).next().value || null;
    const serializedTree = serialize(tree);
    expect(serializedTree).toMatchInlineSnapshot(`
      Array [
        1,
        3,
        1,
        5,
        3,
        2,
        1,
        2,
        1,
        1,
        1,
        1,
        0,
        4,
        4,
        5,
        2,
        5,
        5,
        5,
        0,
      ]
    `);
  });
});

describe('deserialize', () => {
  test('Simple 3d point tree', () => {
    const tree =
      build([3, 2, 4, 1, 5], x => [x], {
        chunkSize: Infinity,
      }).next().value || null;
    const serializedTree = serialize(tree);
    const deserializedTree = deserialize(serializedTree);
    expect(deserializedTree).toEqual(tree);
  });
});
