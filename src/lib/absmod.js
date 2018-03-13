// Extended version of % with negative integer support.
function absmod(n, m) {
  const q = n % m
  return q < 0 ? q + m : q
}

export default absmod
