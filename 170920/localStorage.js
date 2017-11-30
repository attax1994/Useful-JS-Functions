/**
 * 使用localStorage封装一个Storage对象，达到如下效果
 * storage.set('name','饥人谷');
 * storage.set('age',2,30);     //第三个参数为有效时间，超过该秒数则返回undefined
 * storage.set('teachers',['ruoyu','fangfang','tom'],60);
 * 
 * storage.get('name');
 * storage.get('age');     
 * storage.get('teachers');
 */

//ES6 version
var storage = (function () {
    return {
        set: function (key, value, expireSeconds) {
            localStorage.setItem(key, JSON.stringify({
                value: value,
                expired: !!expireSeconds ? Date.now() + 1000 * expireSeconds : undefined
            }));
        },
        get: function (key) {
            var content = JSON.parse(localStorage.getItem(key));
            if (content === undefined) {
                return;
            }
            if (content.expired === undefined || Date.now() < content.expired) {
                return content.value;
            } else {
                localStorage.removeItem(key);
                return;
            }
        }
    }
})();
storage.set('name', 'Jack');
storage.set('age', 2, 30);
storage.set('teachers', ['ruoyu', 'fangfang', 'tom'], 60);
storage.get('name');
storage.get('age');
storage.get('teachers');

// Compiled from TypeScript version
/* var storage = (function () {
    function storage() {
    }
    storage.prototype.set = function (key, value, expireSeconds) {
        localStorage.setItem(key, JSON.stringify({
            value: value,
            expired: !!expireSeconds ? Date.now() + 1000 * expireSeconds : undefined
        }));
    };
    storage.prototype.get = function (key) {
        var content = JSON.parse(localStorage.getItem(key));
        if (content === undefined) {
            return;
        }
        if (content.expired === undefined || Date.now() < content.expired) {
            return content.value;
        }
        else {
            localStorage.removeItem(key);
            return;
        }
    };
    return storage;
}());
storage.set('name', 'Jack');
storage.set('age', 2, 30);
storage.set('teachers', ['ruoyu', 'fangfang', 'tom'], 60);
storage.get('name');
storage.get('age');
storage.get('teachers'); */