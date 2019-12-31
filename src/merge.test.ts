import { append } from './append';
import { merge } from './merge';

describe('merge function', () => {
  test('merge(null, null)', () => {
    expect(merge(null, null)).toBe(null);
  });
  test('merge(tree, null)', () => {
    const t1 = append(null, [1, 2]);
    expect(merge(t1, null)).toBe(t1);
  });
  test('merge(null, tree)', () => {
    const t2 = append(null, [2, 4]);
    expect(merge(null, t2)).toBe(t2);
  });
  test('merge of two trees', () => {
    const t1 = append(null, [4, 6], [2, 4], [6, 8]);
    const t2 = append(null, [5, 7], [3, 5], [7, 9]);
    const merged = merge(t1, t2);
    expect(merged).toMatchSnapshot();
  });
});
