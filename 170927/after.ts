/**
 * 创建一个after函数，只有在运行了count次以后才有执行。
 * 在处理同组异步请求返回结果时，如果你要确保同组里所有异步请求完成之后才执行这个函数，这将非常有用。
 */
function after(count,func){
    return function () {
        if(--count<1){
            return func.apply(this,arguments);
        }
    }
}

let tryout = after(5,(content)=>{
    console.log(content);
});