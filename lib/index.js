// this "return override" hack lets us put a private symbol onto any extensible object
class Base {
  constructor(obj) {
    return obj;
  }
}

// by jridgewell: https://es.discourse.group/t/new-weakmap-entries-properties-true/2645/10
export class PropertyWeakMap {
  #Inner = class extends Base {
    #key;

    static get(object) {
      this.stamp(object);
      return object.#key;
    }

    static has(object) {
      return #key in object;
    }

    static set(object, value) {
      this.stamp(object);
      object.#key = value;
    }

    static stamp(object) {
      if (#key in object) return;
      new this(object);
    }
  };

  get(object) {
    return this.#Inner.get(object);
  }

  has(object) {
    return this.#Inner.has(object);
  }

  set(object, value) {
    this.#Inner.set(object, value);
  }

  delete(object) {
    throw new Error('invalid operation');
  }
}
