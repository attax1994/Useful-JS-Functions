export default class JSONPService {
  /**
   * 根据params生成queryParam
   * @param {Object} params
   * @return {string}
   */
  public static generateQueryParam(params: Object) {
    let temp = '?';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        temp += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}&`;
      }
    }
    return temp;
  }

  /**
   * 生成script标签，执行加载
   * @param {string} url
   */
  public static loadJSONP(url: string) {
    const script = document.createElement('script');
    let done = false;
    script.src = url;
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
  }

  /**
   * 移除相关的回调
   * @param {string} callbackName
   */
  public static removeCallback(callbackName: string) {
    try {
      delete window[callbackName];
    } catch (e) {
    }
    window[callbackName] = null;
  }

  get({
    url, params = {}, callbackName, callback,
    errorCallback = () => {
      console.log(`${callbackName} timed out!`)
    }
  }: { url: string, params?: Object, callbackName: string, callback: Function, errorCallback?: Function }) {
    // 成功的回调
    window[callbackName] = (data: any) => {
      callback(data);
      JSONPService.removeCallback(callbackName);
    };

    // 超时的失败处理
    setTimeout(function () {
      if (typeof window[callbackName] === "function") {
        errorCallback();
        JSONPService.removeCallback(callbackName);
      }
    }, 10000);

    JSONPService.loadJSONP(url + JSONPService.generateQueryParam(params));
  }

  getByPromise({ url, params = {}, callbackName, }: { url: string, params?: Object, callbackName: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      // 成功则执行resolve
      window[callbackName] = (data) => {
        resolve(data);
        JSONPService.removeCallback(callbackName);
      };

      // 超时则执行reject
      setTimeout(() => {
        if (typeof window[callbackName] === "function") {
          reject(`JSONP for ${callbackName} timed out!`);
          JSONPService.removeCallback(callbackName);
        }
      }, 10000);

      JSONPService.loadJSONP(url + JSONPService.generateQueryParam(params));
    });
  }

}