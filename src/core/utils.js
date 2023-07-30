export function capitalize(string) {
  if (typeof string!=='string') {
    return ''
  }
  const method = 'on' + string[0].toUpperCase() + string.slice(1)
  return method
}

function range(start, end) {
  if (start > end) [start, end] = [end, start]
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index)
}

export function matrix(current, target) {
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  const ids = cols.reduce((acc, col)=> {
    rows.forEach((row) => acc.push(`${row}:${col}`))
    return acc
  }, [])
  return ids
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
      row++
      break
    case 'Tab':
      col++
      break
    case 'ArrowUp':
      row-1 < MIN_VALUE ?row = MIN_VALUE :row--
      break
    case 'ArrowDown':
      row++
      break
    case 'ArrowLeft':
      col-1 < MIN_VALUE ?col = MIN_VALUE :col--
      break
    case 'ArrowRight':
      col++
      break
  }
  return `[data-id="${row}:${col}"]`
}
