function currify(fn: Function) {
    const args = [].slice.call(arguments, 1);
    return function () {
        const _inargs = Array.from(arguments);
        return fn.apply(null, args.concat(_inargs));
    };
}