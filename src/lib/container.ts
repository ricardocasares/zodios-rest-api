export class Container<C> {
  constructor(private container: C) {}

  get(key: keyof C) {
    return this.container[key];
  }

  set(key: keyof C, value: C[keyof C]) {
    this.container[key] = value;
    return this;
  }
}
