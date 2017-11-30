/**
 * 实现一个throttle函数，throttle(function,wait,[options])，创建并返回一个像节流阀一样的函数。
 * 当重复调用函数的时候， 至少每隔wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助。
 */

/**
 * leading表示是否为第一次首先执行（立即执行）
 * trailing表示是否为最后一次执行（本次执行完后没有后续）
 */
class optionEntity {
  leading: boolean;
  trailing: boolean;
  constructor() {
    this.leading = false;
    this.trailing = false;
  }
}

/**
 * now()用于获取当前时间
 */
function now() {
  return new Date().getTime();
}

function throttle(func, wait, options: optionEntity) {
  var context, args, result;
  var timeoutfunc = null;
  var previous = 0;
  options = options || new optionEntity();
  /**
   * 先判断options.leading（表示是否第一次首先执行），设置previous
   * 然后清除原来的等待事件，执行方法得到结果，最后清除this指针和参数
   * later的执行逻辑与满足条件的执行段类似！！
   */
  var later = function () {
    previous = options.leading === false ? 0 : now();
    timeoutfunc = null;
    result = func.apply(context, args);
    if (!timeoutfunc) context = args = null;
  };
  return function () {
    context = this;
    args = arguments;
    var now = now();
    // previous为0（刚刚初始化，或者上次执行过后复位），并且不是第一次首先执行的情况下，将previous设置为现在的时间（推迟执行时间）
    if (!previous && options.leading === false) {
      previous = now;
    }
    // 计算剩余时间
    var remaining = wait - (now - previous);

    /**
     * 满足时间条件后的执行段
     * 如果剩余等待时间已到，或者now < previous使得remaining > wait
     */
    if (remaining <= 0 || remaining > wait) {
      // 首先清除timeoutfunc，允许创建下一个等待
      if (timeoutfunc) {
        clearTimeout(timeoutfunc);
        timeoutfunc = null;
      }
      // 执行方法获得结果，并设置previous
      previous = now;
      result = func.apply(context, args);
      // 执行后清除this指针和参数
      if (!timeoutfunc) {
        context = args = null;
      }
    }
    
    /**
     * 未满足时间条件，但是已经可以创建新的等待事件，那么设置时延，预约函数执行
     */
    else if (!timeoutfunc && options.trailing !== false) {
      timeoutfunc = setTimeout(later, remaining);
    }
    return result;
  };
}



