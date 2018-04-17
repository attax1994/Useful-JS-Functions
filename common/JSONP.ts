var JSONP = (function () {
    function get({ url, params = {}, callbackName, callback, errorCallback = () => { console.log(`${callbackName} timed out!`) } }
        : { url: string, params?: Object, callbackName: string, callback: Function, errorCallback?: Function }) {
        function removeNode() {
            try {
                delete window[callbackName];
            } catch (e) {
            }
            window[callbackName] = null;
        }

        // 处理query参数
        let query = '?';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                query += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
            }
        }

        // 加载js文件
        const script = document.createElement('script');
        let done = false;
        script.src = url + query;
        script.async = true;
        script.onload = script['onreadystatechange'] = function () {
            if (!done) {
                done = true;
                script.onload = null;
                if (script) {
                    document.body.removeChild(script);
                }
            }
        };
        document.body.appendChild(script);

        // 注册回调，使用后随即删除
        window[callbackName] = (data: any) => {
            callback(data);
            removeNode()
        };

        // 超时处理
        setTimeout(function () {
            if (typeof window[callbackName] === "function") {
                errorCallback();
                removeNode();
            }
        }, 10000);
    }

    return { get };
}());