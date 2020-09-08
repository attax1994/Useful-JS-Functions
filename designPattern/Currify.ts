/**
 * An adapative version of curry funciton.
 * It will not invoke the function until enough arguments have been passed.
 * @param fn {Function} Function to be currified.
 * @param oldArgs{Array<*>} Old Arguments
 * @returns fn {Function}   Closure for target function,
 * allowed to be invoked for multiple times until enough arguments have been passed.
 * Example:
 * const currifiedSum4 = adapativeCurry(function sum4(a, b, c, d) {
 *  return a + b + c + d
 * })
 */
const adaptiveCurry = (fn: Function, ...oldArgs: Array<any>) => (...args: Array<any>) =>
  oldArgs.length + args.length >= fn.length
    ? fn(...oldArgs, ...args)
    : adaptiveCurry(fn, ...oldArgs, ...args)

/**
 * ES6 version of curry function.
 * @param fn function to be currified
 * @param thisArg this argument, default is null, standing for window or global
 * @param args arguments to be passed into fn
 */
function currify(fn: Function, thisArg: any = null, ...args: Array<any>) {
  return function (...inArgs) {
    return fn.apply(thisArg, [...args, ...inArgs])
  }
}

/**
 * ES3/ES5 version of curry function
 * @param fn function to be currified
 * @param scope this argument, default is null, standing for window or global
 */
function curry(fn, scope) {
  // set the scope to window (the default global object) if no scope was passed in.
  scope = scope || window
  // set args the first group of arguments
  var args = [].slice.call(arguments, 2)

  // Create the new function to return
  return function () {
    // set inargs the second group of arguments
    var inargs = [].slice.call(arguments, 0)
    return fn.apply(scope, args.concat(inargs))
  }
}


/**
 * Another ES6 version of curry function implemented by bind.
 * @param fn function to be currified
 * @param thisArg this argument, default is null, standing for window or global
 * @param args arguments to be passed into fn
 */
function currifyWithBind(fn: Function, thisArg: any = null, ...args: Array<any>) {
  return fn.bind(thisArg, ...args)
}

/**
 * Currify on prototype chain
 */
Function.prototype['currify'] = function (thisArg, ...args) {
  return (...newArgs) => {
    return this.call(thisArg, ...args, ...newArgs)
  }
}
