export const debounce =
  (cb, time = 1000, id) =>
  (...args) =>
    clearTimeout(id, (id = setTimeout(() => cb(...args), time)))

export function debounceSimple(callback, time = 1000, id) {
  if (id) {
    clearTimeout(id)
  }
  return function (...args) {
    setTimeout(function () {
      callback(...args)
    }, time)
  }
}
