export interface IContainer<C> {
  get<K extends keyof C>(key: K): C[K];
  set<K extends keyof C>(
    key: K,
    cb: (get: <V extends keyof C>(k: V) => C[V]) => C[K]
  ): void;
}

export class Container<C> implements IContainer<C> {
  container = new Map<keyof C, C[keyof C]>();

  get<K extends keyof C>(key: K): C[K] {
    if (this.container.has(key)) {
      // because TS is dumb
      // https://github.com/microsoft/TypeScript/issues/9619
      return this.container.get(key) as C[K];
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
