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

//TypeScript Version
class StorageService {
    constructor() { }

    set(key: string, value: any, expireSeconds?: number) {
        localStorage.setItem(key, JSON.stringify({
            value: value,
            expired: !!expireSeconds ? Date.now() + 1000 * expireSeconds : undefined
        }));
    }

    get(key) {
        let content = JSON.parse(localStorage.getItem(key));
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

let storageService = new StorageService();
storageService.set('name', 'Jack');
storageService.set('age', 2, 30);
storageService.set('teachers', ['ruoyu', 'fangfang', 'tom'], 60);
storageService.get('name');
storageService.get('age');
storageService.get('teachers');


// static version
/* class StorageService {
    constructor() { }

    public static set(key: string, value: any, expireSeconds?: number) {
        localStorage.setItem(key, JSON.stringify({
            value: value,
            expired: !!expireSeconds ? Date.now() + 1000 * expireSeconds : undefined
        }));
    }

    public static get(key) {
        let content = JSON.parse(localStorage.getItem(key));
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
StorageService.set('name', 'Jack');
StorageService.set('age', 2, 30);
StorageService.set('teachers', ['ruoyu', 'fangfang', 'tom'], 60);
StorageService.get('name');
StorageService.get('age');
StorageService.get('teachers'); */