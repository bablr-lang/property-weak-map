// this "return override" hack lets us put a private symbol onto any extensible object
class Base {
  constructor(obj) {
    return obj;
  }
}

// by jridgewell: https://es.discourse.group/t/new-weakmap-entries-properties-true/2645/10
export class PropertyWeakMap {
  #Protocol = class extends Base {
    #weakKey;

    static get(object) {
      this.stamp(object);
      return object.#weakKey;
    }

    static has(object) {
      return #weakKey in object;
    }

    static set(object, value) {
      this.stamp(object);
      object.#weakKey = value;
    }

    static stamp(object) {
      if (#weakKey in object) return;
      new this(object);
    }
  };

  get(object) {
    return object && this.#Protocol.get(object);
  }

  has(object) {
    return object && this.#Protocol.has(object);
  }

  set(object, value) {
    this.#Protocol.set(object, value);
  }

  add(object) {
    this.#Protocol.set(object, true);
  }

  delete(object) {
    throw new Error('invalid operation');
  }
}
