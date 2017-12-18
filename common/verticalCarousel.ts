/**
 * 图片上下滚动
 */
const arr = new Array(5);
let currentTarget = 0;
document.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    currentTarget = currentTarget === arr.length - 1 ? arr.length - 1 : currentTarget + 1;
    document.getElementById((currentTarget - 1).toString()).style.transform = "translateY(-100%)";
    document.getElementById(currentTarget.toString()).style.transform = "translateY(0)";
  } else {
    currentTarget = currentTarget === 0 ? 0 : currentTarget - 1;
    document.getElementById((currentTarget + 1).toString()).style.transform = "translateY(100%)";
    document.getElementById(currentTarget.toString()).style.transform = "translateY(0)";
  }
});