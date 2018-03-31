/**
 * 千位分隔+保留两位小数
 */
let x = 0 / 100;
x.toLocaleString("en-us", { style: "currency", currency: 'CNY', minimumFractionDigits: 2 });

var arr = 132456485.4.toFixed(2).split('').reverse();
var result = arr
  .map((value, index) => {
    return ((index + 1) % 3 || index + 1 === arr.length || index + 1 === 3) ? value : ',' + value;
  })
  .reverse()
  .join('');
console.log(result)