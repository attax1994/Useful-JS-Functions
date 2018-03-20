/**
 * 类似于Vue、Angular等MVVM的事件发生器
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
}
myEvent.emit = function (type, data) {
    return document.dispatchEvent(new CustomEvent(type, {
        detail: data,
    }));
}

// useage
_Event.on('search', e => {
    console.log(e.detail)
})
_Event.emit('search', 'study frontend in jirengu.com')