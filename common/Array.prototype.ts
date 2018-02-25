Array.prototype['_map'] = function (callback: Function, thisArg?: Array<any>) {
    if (!this) {
        throw new TypeError('null or undefined');
    }

    // TypeScript中，指定类型后可以省略
    if (typeof callback !== 'function') {
        throw new TypeError('callback type is not function');
    }

    const oldArr = Object(this);
    // Mozilla Code Style. 等同于 const len = oldArr.length || 0;
    const len = oldArr.length >>> 0;

    // TypeScript中可以省略
    if (arguments.length > 1) {
        thisArg = arguments[1];
    }

    let newArr = new Array(len),
        k = 0;
    while (k < len) {
        if (k in oldArr) {
            newArr[k] = callback.call(thisArg, oldArr[k], k, oldArr);
        }
        k++;
    }
    return newArr;
}


Array.prototype['_reduce'] = function (callback: Function, initialValue?: any) {
    if (!this) {
        throw new TypeError('null or undefined');
    }

    // TypeScript中，指定类型后可以省略
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }

    const oldArr = Object(this),
        len = oldArr.length >>> 0;
    let k = 0;
    if (!initialValue) {
        while (k < len && !(k in oldArr)) k++;
        if (k >= len) {
            throw new TypeError('Reduce of empty array ' +
                'with no initial value');
        }
        initialValue = oldArr[k++];
    }
    while (k < len) {
        if (k in oldArr) {
            initialValue = callback(initialValue, oldArr[k], k, oldArr);
        }
        k++;
    }
    return initialValue;
}


Array.prototype['_reduceRight'] = function (callback: Function, initialValue?: any) {
    if (!this) {
        throw new TypeError('null or undefined');
    }

    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }

    const oldArr = Object(this),
        len = oldArr.length >>> 0;
    let k = len - 1;
    if (!initialValue) {
        while (k >= 0 && !(k in oldArr)) k--;
        if (k < 0) {
            throw new TypeError('Reduce of empty array ' +
                'with no initial value');
        }
        initialValue = oldArr[k--];
    }
    while (k >= 0) {
        if (k in oldArr) {
            initialValue = callback(initialValue, oldArr[k], k, oldArr);
        }
        k--;
    }
    return initialValue;
}


Array.prototype['_filter'] = function (callback: Function, thisArg?: Array<any>) {
    if (!this) {
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }

    const oldArr = Object(this),
        len = oldArr.length >>> 0;
    let newArr = [],
        k = 0;
    while (k < len) {
        if (k in oldArr) {
            let val = oldArr[k];
            if (callback.call(thisArg, val, k, oldArr)) {
                newArr.push(val);
            }
        }
        k++;
    }
    return newArr;
}


Array.prototype['_find'] = function (callback: Function, thisArg?: Array<any>) {
    if (!this) {
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    const oldArr = Object(this),
        len = oldArr.length >>> 0;
    let k = 0;
    while (k < len) {
        if (k in oldArr) {
            let val = oldArr[k];
            if (callback.call(thisArg, val, k, oldArr)) {
                return val;
            }
        }
        k++;
    }
    return undefined;
}


Array.prototype['_findIndex'] = function (callback: Function, thisArg?: Array<any>) {
    if (!this) {
        throw new TypeError('null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    const oldArr = Object(this),
        len = oldArr.length >>> 0;
    let k = 0;
    while (k < len) {
        if (k in oldArr) {
            let val = oldArr[k];
            if (callback.call(thisArg, val, k, oldArr)) {
                return k;
            }
        }
        k++;
    }
    return -1;
}