export class Container<C> {
  constructor(private container: C) {}

  get<K extends keyof C>(key: K) {
    return this.container[key] as C[K];
  }

  set<K extends keyof C>(key: keyof C, value: C[K]) {
    this.container[key] = value;
    return this;
  }
}
