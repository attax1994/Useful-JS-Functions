export default class Observer {
    constructor(obj) {
        this.obj = obj;
        this.walk(obj);
    }

    // 这里需要递归，让每个子属性可以observe
    walk(obj) {
        Object.keys(obj).forEach((key) => this.convert(key, obj[key]));
    }

    convert(key, value) {
        defineReactive(this.obj, key, value);
    }
}

export function defineReactive(obj, key, value) {
    var childObj = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => val,
        set: newValue => {
            childObj = observe(newValue);
        },
    });
}

export function observe(value) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
}

