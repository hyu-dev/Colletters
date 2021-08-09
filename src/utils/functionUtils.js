// 배열, 객체 등 slice
const _slice = Array.prototype.slice;
export function sliceArray(list, start = 0, end = list.length) {
  return _slice.call(list, start, end)
}