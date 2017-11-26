/**
 * Wrapping functions into a certain target.
 * @param args
 * @param target
 */
function attach(args, target) {
  args.forEach(value => {
    target[value.name] = function () {
      return value.call(target, null);
    }
  })
}