

//获取随机数
export function randomFrom(l, u) {
  return Math.floor(Math.random() * (u - l + 1) + l);
}