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
