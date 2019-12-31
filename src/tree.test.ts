import { tree } from './tree';

describe('tree function', () => {
  test('without right and left', () => {
    const t = tree(
      [1, 2],
      [
        [1, 1],
        [2, 2],
      ],
      null,
      null,
    );

    expect(t).toEqual({
      left: null,
      point: [1, 2],
      ranges: [
        [1, 1],
        [2, 2],
      ],
      right: null,
    });
  });
  test('with right', () => {
    const t = tree(
      [1, 2],
      [
        [0, 1],
        [1, 2],
      ],
      tree(
        [0, 1],
        [
          [0, 0],
          [1, 1],
        ],
        null,
        null,
      ),
      null,
    );

    expect(t).toEqual({
      left: {
        left: null,
        point: [0, 1],
        ranges: [
          [0, 0],
          [1, 1],
        ],
        right: null,
      },
      point: [1, 2],
      ranges: [
        [0, 1],
        [1, 2],
      ],
      right: null,
    });
  });
  test('with left', () => {
    const t = tree(
      [1, 2],
      [
        [1, 2],
        [1, 2],
      ],
      null,
      tree(
        [2, 1],
        [
          [2, 2],
          [1, 1],
        ],
        null,
        null,
      ),
    );

    expect(t).toEqual({
      left: null,
      point: [1, 2],
      ranges: [
        [1, 2],
        [1, 2],
      ],
      right: {
        left: null,
        point: [2, 1],
        ranges: [
          [2, 2],
          [1, 1],
        ],
        right: null,
      },
    });
  });
});
