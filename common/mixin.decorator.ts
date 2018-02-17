/**
  * Mixing a list(or a single) object into target object, which is a recommended replacement of extending.
  * @param list
  * @return {(target) => any & any}
  */
function mixins(...ObjList) {
    return (target) => Object.assign(target.prototype, ...ObjList);
}