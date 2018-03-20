/**
 * 类似于Vue、Angular等MVVM的事件发生器，使用CustomEvent
 */
// ES6
class _Event {
    static on(type, handler) {
        return document.addEventListener(type, handler)
    }
    static emit(type, data) {
        return document.dispatchEvent(new CustomEvent(type, {
            detail: data
        }))
    }
}

// ES5
function myEvent() {}
myEvent.on = function (type, handler) {
    return document.addEventListener(type, handler);
};
myEvent.emit = function (type, data) {
    return document.dispatchEvent(new CustomEvent(type, {
        detail: data,
    }));
};

_Event.on('search', e => {
    console.log(e.detail);
});
_Event.emit('search', 'Search Event');


/**
 * 不使用CustomEvent，每个handler记录进对应的类型中，然后手动触发
 */
var Event = (function () {
    // private的_events记录每种event的handlers
    var _events = {};

    /**
     * 注册一个Event的handler
     * @param {String} evt 
     * @param {*} handler 
     */
    function on(evt, handler) {
        _events[evt] = _events[evt] || [];
        // 如果是没有名称的话就无法删除
        _events[evt].push({
            name: handler.name || 'anonymous',
            handler: handler,
        });
    }

    /**
     * 触发一种Event，并传入数据
     * @param {String} evt 
     * @param {*} args 
     */
    function emit(evt, args) {
        if (!_events[evt]) {
            return;
        }
        for (var i = 0, ii = _events[evt].length; i < ii; i++) {
            _events[evt][i].handler(args);
        }
    }

    /**
     * 用来移除非匿名的handler
     * @param {String} evt 
     * @param {String} name 
     */
    function remove(evt, name) {
        if (!_events[evt]) {
            return;
        }
        _events[evt] = _events[evt].filter(value => {
            return value.name !== name;
        });
    }

    return {
        on: on,
        emit: emit,
        remove: remove,
    };
})();

Event.on('search', function dosth(data) {
    console.log(data);
});

Event.emit('search', '123');

Event.remove('search', 'dosth');

Event.emit('search', '123');