// ES3 一般式
function Super() {
    this.name = 'father';
    this.age = 30;
}

Super.prototype.say = function () {
    console.log(this.name + this.age);
}

function Sub1() {
    this.name = 'son';
    this.age = 5;
}
Sub1.prototype = new Super();
// 重写父类方法
Sub1.prototype.say = function () {
    // ...
}
Sub1.prototype.another = function () {
    // ...
}


// ES5 组合式
function Sub2() {
    Super.call(this);
    this.attriute = '';
}
// 此时constructor为Super
Sub2.prototype = new Super();
// 需要重定位constructor
Sub2.prototype.constructor = Sub2;

// 以及类似于行为委托的形式
Sub2.prototype = Object.create(Super.prototype);
// 需要重定位constructor
Sub2.prototype.constructor = Sub2;

// 或者使用__proto__
Sub2.prototype.__proto__ = Super.prototype;
//ES6提供一种新的操作方式
Object.setPrototypeOf(Sub2.prototype, Super.prototype);


// ES6
class A {
    name: string;
    constructor() {
        this.name = 'father';
    }
    say() {
        console.log('Method from father');
    }
}

class B extends A {
    constructor() {
        super();
    }
    say() {
        console.log('Method from son');
        super.say();
    }
}

// typescript的转译
function __extends(d: Function, b: Function) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}

var base = (function () {
    function base() { }
    return base;
})();

var sub = (function (_super) {
    __extends(sub, _super);

    function sub(param) {
        _super.call(this);
        this.param = param;
    }

    sub.prototype.someMethod = function () { };

    return sub;
})(base);