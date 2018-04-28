var Singleton = (function () {
    // 将instance作为Private属性
    var instance = null;
    // 将init作为Private方法
    function init() {
        return instance = {
            logValue: function () {
                console.log(this.value);
            },
            properties: {},
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        },
        setProperties: function (newValue) {
            this.getInstance().properties = newValue;
            return instance;
        }
    }
}());