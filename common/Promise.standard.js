;
(function () {
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  function Promise(fn) {
    this._state = PENDING;
    this._value = null;
    this._thenResult = null;
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
        this._thenResult = handler.onFulfilled(this._value);
      }
      if (this._state === REJECTED && typeof handler.onRejected === 'function') {
        this._thenResult = handler.onRejected(this._value);
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
    var self = this;


    // 已经决议了，直接执行then
    if (this._state !== PENDING) {
      this.excuteThen(handler);
    }
    // 还没决议，压入handlers堆栈
    else {
      this._handlers.push(handler);
    }

    var thenable = new Promise((resolve, reject) => {
      if (self._state === FULFILLED) {
        resolve(self._value);
      }
      if (self._state === REJECTED) {
        reject(self._value);
      }
    });
    // _state指向Promise本体的_state
    Object.defineProperty(thenable, '_state', {
      get: function () {
        return self._state;
      },
      configurable: false,
      enumerable: false,
    });

    // _value指向上一个then的_thenResult
    Object.defineProperty(thenable, '_value', {
      get: function () {
        /**
         * 如何获取异步上一个then返回的值？是否用它的setter？
         */
      },
      configurable: false,
      enumerable: false,
    });
    return thenable;
  }

  window.Promise = Promise;
}());

var p = new Promise(function (resolve) {
  setTimeout(() => {
    resolve('123')
  }, 10000);
});
var ap = p.then((data) => {
  console.log(data);
  return 321;
}).then((data) => {
  console.log(data);
});
ap;