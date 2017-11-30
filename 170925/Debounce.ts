/**
 * 实现一个debounce函数，debounce(function,wait,[immediate返回function函数的防反跳版本，将延迟函数的执行（真正的执行）在函数
 * 最后一次调用时刻的wait毫秒后。对于必须在一些输入（用户操作）停止到达之后执行的行为有帮助。例如：渲染一个MarkDown格式的
 * 评论预览，当窗口停止改变大小之后重新计算布局])
 */

function now() {
    return new Date().getTime();
}

function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
        var last = now() - timestamp;
        // 未达到等待时间
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        }
        // 已达到等待时间
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    }

    return function () {
        context = this;
        args = arguments;
        // immediate为true，并且timeout未注册或已清除（通常是针对immediate）
        var callNow: boolean = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    }
}