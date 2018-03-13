function range(begin, end) {
  return Array(end + 1 - begin)
    .fill()
    .reduce((arr, _, idx) => arr.concat(begin + idx), [])
}

export default range
