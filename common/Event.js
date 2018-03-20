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

// useage
_Event.on('search', e => {
    console.log(e.detail);
});
_Event.emit('search', 'study frontend in jirengu.com');


/**
 * 不使用CustomEvent，每个handler记录进对应的类型中，然后手动触发
 */
var Event = (function () {
    // private的_events记录每种event的handlers
    var _events = {};

    function on(evt, handler) {
        _events[evt] = events[_evt] || [];
        _events[evt].push({
            handler: handler
        });
    }

    function trigger(evt, args) {
        if (!events[evt]) {
            return;
        }
        for (var i = 0, ii = events[evt].length; i < ii; i++) {
            events[evt][i].handler(args);
        }

    }
    return {
        on: on,
        trigger: trigger
    };
})();

Event.on('search', function (data) {
    console.log(data);
})

Event.trigger('search', '饥人谷');