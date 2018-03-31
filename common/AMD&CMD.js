// AMD
define('aplha', ['require', 'exports', 'beta'], function (require, exports, beta) {
    'use strict';
    exports.verb = function () {
        return require('beta').verb();
    }
});

define(['alpha'], function (alpha) {
    'use strict';
    return {
        verb: alpha.verb() + 1
    };
});

require(['jQuery', 'aplha'], function ($, aplha) {
    'use strict';
});

//CMD
define('myModule', function (require, exports, module) {
    'use strict';
    let moduleOne = require('moduleOne');
});


var ModuleManager = (function () {
    var _modules = {};

    function getModule(name) {
        return _modules[name] || {};
    }

    function define(name, deps, fn) {
        if (typeof name !== 'string') {
            throw new TypeError('name should be string.');
        }
        if (_modules[name]) {
            throw new Error('This module has been already declared.');
        }
        if (!deps instanceof Array) {
            throw new TypeError('deps should be Array<String>.');
        }
        if (!fn instanceof Function) {
            throw new TypeError('fn should be function.');
        }

        var depsModules = [];
        for (var i = 0, len = deps.length; i < len; i++) {
            depsModules.push(getModule(deps[i]));
        }

        _modules[name] = fn.apply(null, depsModules);
        return true;
    }

    function require(deps, fn) {
        if (!deps instanceof Array) {
            throw new TypeError('deps should be Array<String>.');
        }
        if (!fn instanceof Function) {
            throw new TypeError('fn should be function.');
        }

        var depsModules = [];
        for (var i = 0, len = deps.length; i < len; i++) {
            depsModules.push(getModule(deps[i]));
        }

        fn.apply(null, depsModules);
    }

    return {
        define: define,
        require: require,
    };
})();