/**
* Clone the value of an Object based Array or Object both with or without prototype.
* Returns the new target which does not share the same pointer as source.
* @param source : any
* @returns any
*/
function deepClone(source: any) {
    if (!(source instanceof Object)) {
        return source;
    }

    if (Object.prototype.toString.call(source) === '[object Array]') {
        return source.map((value) => {
            return deepClone(value);
        });
    }
    if (Object.prototype.toString.call(source) === '[object Object]') {
        let cloned = {};
        // 原型链继承
        Object.setPrototypeOf(cloned, Object.getPrototypeOf(source));
        // 属性处理
        for (let key in source) {
            cloned[key] = deepClone(source[key]);
        }

        return cloned;
    }
}


// MDN提供的方法
function clone(objectToBeCloned) {
    // Basis.
    if (!(objectToBeCloned instanceof Object)) {
        return objectToBeCloned;
    }

    var objectClone;

    // Filter out special objects.
    var Constructor = objectToBeCloned.constructor;
    switch (Constructor) {
        // Implement other special objects here.
        case RegExp:
            objectClone = new Constructor(objectToBeCloned);
            break;
        case Date:
            objectClone = new Constructor(objectToBeCloned.getTime());
            break;
        default:
            objectClone = new Constructor();
    }

    // Clone each property.
    for (var prop in objectToBeCloned) {
        objectClone[prop] = clone(objectToBeCloned[prop]);
    }

    return objectClone;
}