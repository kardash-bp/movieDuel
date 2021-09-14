export const debounce =
  (cb, time = 1000, id) =>
  (...args) =>
    clearTimeout(id, (id = setTimeout(() => cb(...args), time)))

const debounceSimple = (callback, time = 1000, id) => {
  if (id) {
    clearTimeout(id)
  }
  return (...args) =>
    setTimeout(() => {
      callback(...args)
    }, time)
}
