import { append } from './append';
import { ITree } from './types';

describe('append function', () => {
  test('append to empty tree 1-d point', () => {
    const d1Tree = append(null, [1]);
    expect(d1Tree).toMatchSnapshot();
  });
  test('append to empty tree 2-d point', () => {
    const d1Tree = append(null, [1, 2]);
    expect(d1Tree).toMatchSnapshot();
  });
  test('append to empty tree 3-d point', () => {
    const d1Tree = append(null, [1, 2, 3]);
    expect(d1Tree).toMatchSnapshot();
  });
  test('append instead of head without right and left', () => {
    const t = append(null, [1, 2]);
    const newT = append(t, [1, 3]);
    expect(newT).toMatchSnapshot();
  });
  test('append instead of head with right and left, without changing of ranges', () => {
    const tree: ITree<[number, number]> = {
      left: {
        left: null,
        point: [4, 16],
        ranges: [
          [4, 4],
          [16, 16],
        ],
        right: null,
      },
      point: [5, 25],
      ranges: [
        [4, 6],
        [16, 36],
      ],
      right: {
        left: null,
        point: [6, 36],
        ranges: [
          [6, 6],
          [36, 36],
        ],
        right: null,
      },
    };
    const newT = append(tree, [5, 17]);
    expect(newT).toMatchSnapshot();
  });
  test('append instead of head with right and left, decreasing without changing of ranges', () => {
    const tree: ITree<[number, number]> = {
      left: {
        left: null,
        point: [4, 36],
        ranges: [
          [4, 4],
          [36, 36],
        ],
        right: null,
      },
      point: [5, 25],
      ranges: [
        [4, 6],
        [16, 36],
      ],
      right: {
        left: null,
        point: [6, 16],
        ranges: [
          [6, 6],
          [16, 16],
        ],
        right: null,
      },
    };
    const newT = append(tree, [5, 17]);
    expect(newT).toMatchSnapshot();
  });
  test('append instead of head with right and left, with min change ranges', () => {
    const tree: ITree<[number, number]> = {
      left: {
        left: null,
        point: [4, 16],
        ranges: [
          [4, 4],
          [16, 16],
        ],
        right: null,
      },
      point: [5, 25],
      ranges: [
        [4, 6],
        [16, 36],
      ],
      right: {
        left: null,
        point: [6, 36],
        ranges: [
          [6, 6],
          [36, 36],
        ],
        right: null,
      },
    };
    const newT = append(tree, [5, 10]);
    expect(newT).toMatchSnapshot();
  });
  test('append instead of head with right and left, with max change ranges', () => {
    const tree: ITree<[number, number]> = {
      left: {
        left: null,
        point: [4, 16],
        ranges: [
          [4, 4],
          [16, 16],
        ],
        right: null,
      },
      point: [5, 25],
      ranges: [
        [4, 6],
        [16, 36],
      ],
      right: {
        left: null,
        point: [6, 36],
        ranges: [
          [6, 6],
          [36, 36],
        ],
        right: null,
      },
    };
    const newT = append(tree, [5, 40]);
    expect(newT).toMatchSnapshot();
  });
  test('append instead of head with right and left, decreasing, with min change ranges', () => {
    const tree: ITree<[number, number]> = {
      left: {
        left: null,
        point: [4, 36],
        ranges: [
          [4, 4],
          [36, 36],
        ],
        right: null,
      },
      point: [5, 25],
      ranges: [
        [4, 6],
        [16, 36],
      ],
      right: {
        left: null,
        point: [6, 16],
        ranges: [
          [6, 6],
          [16, 16],
        ],
        right: null,
      },
    };
    const newT = append(tree, [5, 10]);
    expect(newT).toMatchSnapshot();
  });
  test('append instead of head with right and left, decreasing, with max change ranges', () => {
    const tree: ITree<[number, number]> = {
      left: {
        left: null,
        point: [4, 36],
        ranges: [
          [4, 4],
          [36, 36],
        ],
        right: null,
      },
      point: [5, 25],
      ranges: [
        [4, 6],
        [16, 36],
      ],
      right: {
        left: null,
        point: [6, 16],
        ranges: [
          [6, 6],
          [16, 16],
        ],
        right: null,
      },
    };
    const newT = append(tree, [5, 40]);
    expect(newT).toMatchSnapshot();
  });
});
