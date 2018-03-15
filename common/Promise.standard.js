;
(function () {
  'use strict';

  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  function Promise(fn) {
    this._state = PENDING;
    this._value = null;
    // 用树形结构去记录then注册的hanlder，然后等到主Promise决议了，在_excuteThen中操作then返回Promise的状态和结果值
    this._handlers = [];

    if (fn) {
      this._enqueue(fn.bind(null, this._resolve.bind(this), this._reject.bind(this)));
    }
    return this;
  }


  /**
   * Promise的then方法。
   * 注册新的handler，挂载到handlers树上。
   * 返回该hanlder的promise引用，用于链式调用。
   * 返回的promise的_value取决于then传入的onFulfilled或onRejected函数的返回值。
   * @param {*} onFulfilled 
   * @param {*} onRejected 
   */
  Promise.prototype.then = function (onFulfilled, onRejected) {
    var handler = {
      onFulfilled: onFulfilled,
      onRejected: onRejected,
      promise: new Promise(),
    };

    // 先压入堆栈，形成树形结构
    var index = this._handlers.push(handler) - 1;
    // 已经决议了，直接执行then
    if (this._state !== PENDING) {
      this._excuteThen(handler);
    }

    return this._handlers[index].promise;
  };


  /**
   * Promise的resolve方法。
   * 行为包括状态置位，修改结果，然后执行先前压入堆栈的then
   * @param {*} result 
   */
  Promise.prototype._resolve = function (result) {
    // 只有PENDING情况下才能修改状态
    if (this._state === PENDING) {
      this._state = FULFILLED;
      this._value = result;
      this._handlers.forEach(this._excuteThen.bind(this));
    }
  };


  /**
   * Promise的reject方法
   * @param {*} result 
   */
  Promise.prototype._reject = function (result) {
    // 只有PENDING情况下才能修改状态
    if (this._state === PENDING) {
      this._state = REJECTED;
      this._value = reason;
      this._handlers.forEach(this._excuteThen.bind(this));
    }
  };


  /**
   * 执行then，同时也通知then返回的promise去执行resolve或reject。
   * then中的_value最终使用的值是then中onFulfilled或onRejected的返回值。
   * @param {*} handler 
   */
  Promise.prototype._excuteThen = function (handler) {
    if (this._state === FULFILLED && typeof handler.onFulfilled === 'function') {
      // 异步触发then
      this._enqueue(
        handler.promise._resolve.bind(
          handler.promise,
          handler.onFulfilled(this._value)
        )
      );
      // 同步触发then
      /* handler.promise._reject(handler.onFulfilled(this._value)); */
    }
    if (this._state === REJECTED && typeof handler.onRejected === 'function') {
      this._enqueue(
        handler.promise._resolve.bind(
          handler.promise,
          handler.onRejected(this._value)
        )
      );
      /* handler.promise._reject(handler.onRejected(this._value)); */
    }
  };


  /**
   * 将fn加入事件循环
   * @param {Function} fn 
   */
  Promise.prototype._enqueue = function(fn){
    // process.nextTick(fn); // NodeJS
    setTimeout(fn.bind(this), 0);
  };


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
});
var aap = ap.then((data) => {
  console.log(data);
  return 'aap';
});

// 异步触发情况下就要注意回调的值
for(var i=0; i<100; i++){
  (function(j){
    p.then((data)=>{
      return j;
    });
  })(i);
}