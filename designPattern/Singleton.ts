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

