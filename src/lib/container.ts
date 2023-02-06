export class Container<C> {
  private container = new Map<keyof C, C[keyof C]>();

  get<K extends keyof C>(key: K): C[K] {
    if (this.container.has(key)) {
      // @ts-ignore
      // Because TS is dumb:
      // https://github.com/microsoft/TypeScript/issues/9619
      return this.container.get(key);
    }

    throw new Error(`Key '${String(key)}' not found inside the container`);
  }

  set<K extends keyof C>(
    key: K,
    cb: (get: <V extends keyof C>(k: V) => C[V]) => C[K]
  ) {
    this.container.set(key, cb(this.get.bind(this)));

    return this;
  }
}
