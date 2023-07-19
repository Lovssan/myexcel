export function capitalize(string) {
  if (typeof string!=='string') {
    return ''
  }
  const method = 'on' + string[0].toUpperCase() + string.slice(1)
  return method
}
