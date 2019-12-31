import { iterate } from './iterate';
import { append } from './append';

describe('iterate in tree', () => {
  test('iterate of null', () => {
    expect([...iterate(null)]).toEqual([]);
  });
  test('iterate of single element', () => {
    expect([...iterate(append(null, [1, 2]))]).toEqual([[1, 2]]);
  });
  test('iterate of multiple element', () => {
    expect([...iterate(append(null, [1, 2], [6, 7], [3, 4]))]).toEqual([
      [1, 2],
      [3, 4],
      [6, 7],
    ]);
  });
});
