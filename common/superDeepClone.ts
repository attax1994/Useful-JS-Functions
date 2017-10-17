/**
   * Clone the value of an Object based Array or Object both with or without prototype.
   * Returns the new target which does not share the same pointer as source.
   * @param source : any
   * @returns {Array<Object> || Object}
   */
function deepClone(source: any) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        return source.map((value) => {
            if (Object.prototype.toString.call(value) === '[object Array]') {
                return deepClone(value);
            } else if (Object.prototype.toString.call(value) === '[object Object]') {
                return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
            } else {
                return JSON.parse(JSON.stringify(value));
            }
        });
    }
    if (Object.prototype.toString.call(source) === '[object Object]') {
        return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
    }
    return JSON.parse(JSON.stringify(source));
}