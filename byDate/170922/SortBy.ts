/**
 * Pluck from the key pointer as the value of returned list.
 * @param obj : Array
 * @param key : string
 */
function pluck(obj: Array<any>, key: string) {
  // return the value of key pointer only 
  return obj.map(function (currentValue, index) {
    return currentValue[key];
  });
}

/**
 * Advanced sort for list, which only requires the function that returns the value of criteria.
 * @param obj : Array
 * @param ascend : boolean
 * @param iteratee : function || string
 */
function sortBy(obj: Array<any>, ascend: boolean, iteratee: any) {
  return pluck(obj
    // preparations for the sort
    .map(function (value, index, list) {
      return {
        value: value,
        index: index,
        criteria: typeof iteratee === 'function' ? iteratee(value, index, list) : value[iteratee]
      };
    })
    // sort array by criteria given before
    .sort(function (left, right) {
      let a = left.criteria;
      let b = right.criteria;
      if (ascend) {
        if (a !== b) {
          if (a > b || a === void 0) { return 1; }
          if (a < b || b === void 0) { return -1; }
        }
        return left.index - right.index;
      } else {
        if (a !== b) {
          if (a < b || a === void 0) { return 1; }
          if (a > b || b === void 0) { return -1; }
        }
        return right.index - left.index;
      }
    }), 'value');
}

// test case
sortBy([1.3, 3.1, 2.4], true, function (num) {
  return Math.floor(num);
});
sortBy(['one', 'two', 'three', 'four'], true, 'length');
