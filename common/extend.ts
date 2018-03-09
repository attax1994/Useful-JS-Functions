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

// 或者使用__proto__
Sub2.prototype['__proto__'] = Super.prototype;
// 以及api的形式
Sub2.prototype = Object.create(Super.prototype);


// ES6
class A {
    name: string;
    constructor() {
        this.name = 'father';
    }
}

class B extends A {
    constructor() {
        super();
    }
}

