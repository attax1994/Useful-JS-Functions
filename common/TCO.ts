function tco(f) {
  var value,
      active = false,
      accumulated = [];

  
  // 在f内部进行递归调用的时候，其实调用的是这个返回的accumulator
  // 这里需要注意的是，要将f中的递归调用函数名使用accumulator被赋予的变量名
  return function accumulator(...args) {
      accumulated.push(args);
      if(!active) {
          active = true;
          /**
           * 由于每次f.apply都会导致accumulated被push进一个新的args，
           * 所以这个while一直要到全部执行结束才会跳出，
           * 但这种结构只会保持最多两层的调用栈
           */
          while(accumulated.length) {
              value = f.apply(this, accumulated.shift());
          }
          active = false;
          return value;
      }
  }
}

var sum = tco(function(x, y) {
  if (y > 0) {
      // 再次调用的其实是闭包返回的accumulator
      return sum(x + 1, y - 1)
  }
  else {
      return x
  }
});