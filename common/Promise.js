// 状态机
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function Promise(fn) {
    this.state = PENDING;
    this.value = null;
    this.handlers = [];


    /**
     * 将状态改为成功，要改变状态，放进结果值，并逐个执行回调
     * @param {*} result 
     */
    function fulfill(result) {
        this.state = FULFILLED;
        this.value = result;
        // 逐个传给handle()函数，执行回调
        this.handlers.forEach(handle);
        // 最后handlers置空
        this.handlers = null;
    }


    /**
     * 将状态改为失败，要改变状态，放进结果值，并逐个执行回调
     * @param {*} error 
     */
    function reject(error) {
        this.state = REJECTED;
        this.value = error;
        // 逐个传给handle()函数，执行回调
        this.handlers.forEach(handle);
        // 最后handlers置空
        this.handlers = null;
    }


    /**
     * 返回目标的then方法
     * @param {*} value 
     */
    function getThen(value) {
        var t = typeof value;
        if (value && (t === 'ojbect' || t === 'function')) {
            var then = value.then;
            if (typeof then === 'function') {
                return then;
            }
        }
        return null;
    }


    /**
     * Promise的resolve方法，
     * @param {*} result 
     */
    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                fulfill.call(this);
                doResolve(then.bind(result), resolve, reject);
                return;
            }
        } catch (e) {
            reject(e);
        }
    }


    /**
     * 执行回调。
     * 根据state去判断其行为，PENDING压入handlers栈，FULFILLED执行onFulfilled，REJECTED执行onRejected
     * @param {*} handler 
     */
    function handle(handler) {
        // 异步还没有完成，handler入栈
        if (this.state === PENDING) {
            this.handlers.push(handler);
        } else {
            if (this.state === FULFILLED && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (this.state === REJECTED && typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }


    /**
     * 
     * @param {*} fn 
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    function doResolve(fn, onFulfilled, onRejected) {
        var done = false;
        try {
            fn(function (value) {
                if (done) return;
                done = true;
                onFulfilled(value);
            }, function (reason) {
                if (done) return;
                done = true;
                onRejected(value);
            });
        } catch (ex) {
            if (done) return;
            done = true;
            onRejected(ex);
        }
    }


    /**
     * then方法，负责注册或执行下一步的回调，返回重新包装过的Promise对象(thenable)
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    this.then = function (onFulfilled, onRejected) {
        var self = this;
        return new Promise(
            function (resolve, reject) {
                return self.done(function (result) {
                    if (typeof onFulfilled === 'function') {
                        try {
                            return resolve(onFulfilled(result));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return resolve(result);
                    }
                }, function (error) {
                    if (typeof onRejected === 'function') {
                        try {
                            return resolve(onRejected(error));
                        } catch (ex) {
                            return reject(ex);
                        }
                    } else {
                        return reject(error);
                    }
                });
            }
        );
    };


    /**
     * 类似于finally方法，结束后不会再返回thenable的对象。
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    this.done = function (onFulfilled, onRejected) {
        // 异步执行
        setTimeout(function () {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected,
            });
        }, 0);
    };

    doResolve(fn, resolve, reject);
}