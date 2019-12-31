interface IQueueNode<T> {
  value: T;
  next: IQueueNode<T> | null;
}

export class Queue<T> {
  public start: IQueueNode<T> | null;
  public end: IQueueNode<T> | null;
  public length: number;

  constructor() {
    this.start = null;
    this.end = null;
    this.length = 0;
  }

  public push(value: T) {
    if (!this.start) {
      this.start = {
        next: null,
        value,
      };
      this.end = this.start;
      this.length = 1;
      return this;
    }
    const node = { value, next: null };
    this.end!.next = node;
    this.end = node;
    this.length++;
    return this;
  }
  public pop(): T {
    if (!this.start) {
      throw new Error('Empty queue access');
    }
    const current = this.start.value;
    this.start = this.start.next;
    this.length--;
    return current;
  }
}
