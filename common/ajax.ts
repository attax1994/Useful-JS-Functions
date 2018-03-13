; (function () {
    interface RequestParamsInterface {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'CONNECT' | 'HEAD' | 'PATCH' | 'TRACE';
        header?: Object;
        body?: Object;
    }

    const onreadystatechangeHandler = function (xhr: XMLHttpRequest, resolve: Function, reject: Function) {
        if (xhr.readyState === 4) {
            const status = xhr.status.toString().substring(0, 1);
            if (status === '2' || status === '3') {
                resolve(xhr.response);
            } else {
                reject(xhr.response);
            }
        }
    };


    const ajax = function (requestParams: RequestParamsInterface) {
        const { url, method, header = {}, body = {} } = requestParams;
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = onreadystatechangeHandler.bind(this, xhr, resolve, reject);
            for (var key in header) {
                xhr.setRequestHeader(key, header[key]);
            }
            xhr.open(method, url, true);

            if (method === 'POST' || method === 'PUT') {
                xhr.send(body);
            } else {
                xhr.send(null);
            }

        });
    }

    window['ajax'] = ajax;

})();


