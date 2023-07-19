const CODES = {
  A: 65,
  Z: 90
}
function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}
function createCol(content) {
  return `
    <div class="column">${content}</div>
  `
}
function createRow(content, str = '') {
  return `
    <div class="row">
      <div class="row-info">${str}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A +index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z-CODES.A
  const rows = []
  const cols = new Array(colsCount+1)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount+1)
        .fill(createCell())
        .join('')
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}
