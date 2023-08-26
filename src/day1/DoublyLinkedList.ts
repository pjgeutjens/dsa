type Node<T> = {
  value: T
  next?: Node<T>
  prev?: Node<T>
}

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>
  private tail?: Node<T>

  constructor() {
    this.head = this.tail = undefined
    this.length = 0
  }

  prepend(item: T): void {
    const node = { value: item } as Node<T>
    this.length++
    if (!this.head) {
      this.head = this.tail = node;
      return
    }

    this.head.prev = node;
    node.next = this.head;
    this.head = node
  }
  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error('Index out of bound')
    } else if (idx === this.length) {
      this.append(item)
      return;
    } else if (idx === 0) {
      this.append(item)
      return;
    }

    let curr = this.getAt(idx)
    curr = curr as Node<T>;
    const node = { value: item } as Node<T>;
    this.length++;

    node.next = curr;
    node.prev = curr.prev;
    curr.prev = node;
    if (curr.prev) {
      curr.prev.next = node
    }
  }
  append(item: T): void {
    const node = { value: item } as Node<T>
    this.length++
    if (!this.tail) {
      this.tail = this.head = node;
      return
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }
  remove(item: T): T | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.value !== item) { curr = curr.next }
    }

    if (!curr) { return undefined }
    curr = curr as Node<T>;
    if (curr.value !== item) { return undefined }

    this.length--;
    if (curr === this.head) {
      this.head = curr.next
    }
    if (curr === this.tail) {
      this.tail = curr.prev
    }

    if (curr.prev) {
      curr.prev.next = curr.next;
    }
    if (curr.next) {
      curr.next.prev = curr.prev;
    }
    return curr.value;
  }
  get(idx: number): T | undefined {
    let curr = this.getAt(idx)
    curr = curr as Node<T>;
    return curr?.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx > this.length) { return undefined; }

    let curr = this.getAt(idx);
    if (!curr) { return undefined }
    if (curr === this.head) {
      this.head = curr.next
    }
    if (curr === this.tail) {
      this.tail = curr.prev
    }

    this.length--;
    curr = curr as Node<T>;
    if (curr.prev) {
      curr.prev.next = curr.next;
    }
    if (curr.next) {
      curr.next.prev = curr.prev;
    }
    return curr?.value;
  }
  private getAt(idx: number): Node<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr;
  }

  private debug(msg: string) {
    let curr = this.head;
    let out = `${msg}:`;
    for (let i = 0; curr && i < this.length; ++i) {
      out += `${i} => ${curr?.value} `
      curr = curr.next;
    }
    console.log(out)
  }

}
