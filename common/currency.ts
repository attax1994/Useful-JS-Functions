/**
 * 千位分隔+保留两位小数
 */
let x = 0 / 100;
x.toLocaleString("en-us", { style: "currency", currency: 'CNY', minimumFractionDigits: 2 });