export interface SingletonFunction extends ObjectConstructor {
  $instance?: any
}
export function generateSingleton(fn: SingletonFunction, ...args: Array<any>): () => SingletonFunction {
  !fn.$instance &&
    (Object.defineProperty
      ? Object.defineProperty(fn, '$instance', {
        value: new fn(...args),
        writable: false,
        configurable: false,
        enumerable: false
      })
      : fn.$instance = new fn(...args)
    )
  return () => fn.$instance
}

export class Singleton {
  private static instance = Object.seal(new Singleton());

  constructor() {
    if (Singleton.instance) {
      throw new Error('Singleton is not available to constructors, use getInstance() instead.');
    }
    Singleton.instance = this;
  }

  /**
   * Get instance of singleton object.
   * @returns {Singleton}
   */
  public static get getInstance(): Singleton {
    return Singleton.instance;
  }

}
