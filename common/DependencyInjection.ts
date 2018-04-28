/**
 * This design requires Decorator support!
 * Apply TypeScript alongwith experimentalDecorators or Babel Decorator instead of ES5 syntax.
 */
const ModuleManager = (function () {
    window.Modules = {};
    const modules = window.Modules;

    function BKDRHash(str: string): number {
        const seed: number = 31;
        let hash: number = 0,
            index: number = 0;
        while (str[index]) {
            hash = hash * seed + str.charCodeAt(index++);
            hash &= 0xFFFFFFFF;
        }
        return hash;
    }

    function addModule(target: any): void {
        const hash = BKDRHash(target.toString().replace(/^function\s(.*)?\s.*/, '$1'));
        if (!modules[hash]) {
            modules[hash] = new target();
        }
    }

    function getModule(target: any): any {
        const hash = BKDRHash(target.toString().replace(/^function\s(.*)?\s.*/, '$1'));
        if (!modules[hash]) {
            modules[hash] = new target();
        }
        return modules[hash];
    }

    return {
        addModule,
        getModule,
    }
}());

declare global {
    interface Window {
        Modules: any;
    }
}

/**
 * Decorator above dependency to be registered.
 * @returns {(target: any) => void}
 * @constructor
 */
const Injectable = (): ClassDecorator => (target: Function): any => {
    ModuleManager.addModule(target);
};

/**
 * Inject Module by defining Property Descriptor of a certain property.
 * @param module
 * @returns {PropertyDecorator}
 * @constructor
 */
const Provided = (module: any): PropertyDecorator => (target: Object, name: string | symbol): any => {
    const instance = ModuleManager.getModule(module);
    return {
        configurable: true,
        enumerable: false,
        set: () => {
        },
        get: () => {
            return instance;
        },
    };
};

export default ModuleManager;

export {
    Injectable,
    Provided,
};

// Basic usage
@Injectable()
class Injection { }

class InjectedClass {
    @Provided(Injection) private _injection: Injection;
}