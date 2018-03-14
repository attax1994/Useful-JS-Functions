;
(function () {
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  function Promise(fn) {
    this._state = PENDING;
    this._value = null;
    this._handlers = [];

    var enqueue = function (fn) {
      // process.nextTick(fn); // NodeJS
      setTimeout(fn, 0);
    }

    var resolve = (function (result) {
      // 只有PENDING情况下才能修改状态
      if (this._state === PENDING) {
        this._state = FULFILLED;
        this._value = result;
        this._handlers.forEach(excuteThen.bind(this));
        this._handlers = null;
      }
    }).bind(this);

    var reject = (function (result) {
      // 只有PENDING情况下才能修改状态
      if (this._state === PENDING) {
        this._state = REJECTED;
        this._value = reason;
        this._handlers.forEach(excuteThen.bind(this));
        this._handlers = null;
      }
    }).bind(this);

    /**
     * 暂时使用同步方式执行then注册的回调，如需异步则使用enqueue包装
     * @param {*} handler 
     */
    var excuteThen = (function (handler) {
      var result;
      if (this._state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(this._value);
      }
      if (this._state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(this._value);
      }
    }).bind(this);

    if (fn) {
      enqueue(fn(resolve, reject));
    }
    return this;
  }

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var handler = {
      onFulfilled: onFulfilled,
      onRejected: onRejected,
    };

    // 已经决议了，直接执行then
    if (this._state !== PENDING) {
      this.excuteThen(handler);
    }
    // 还没决议，压入handlers堆栈
    else {
      this._handlers.push(handler);
    }

    return this;
  }

  window.Promise = Promise;
}());

var p = new Promise(function (resolve) {
  setTimeout(() => {
    resolve('123')
  }, 1000);
});
var ap = p.then((data) => {
  console.log(data);
  return 321;
}).then((data) => {
  console.log(data);
});
ap;
