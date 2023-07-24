const CODES = {
  A: 65,
  Z: 90
}
function createCell(index) {
  return `
    <div class="cell" contenteditable data-id=${index}></div>
  `
}
function createCol(content, id) {
  return `
    <div class="column" data-resized="resized" data-id="${id}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}
function createRow(content, str = '') {
  return `
    <div class="row" ${str?'data-resized="resized"':''}>
      <div class="row-info">
        ${str?str:''}
        ${str?'<div class="row-resize" data-resize="row"></div>':''}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A +index)
}

export function createTable(rowsCount = 30) {
  let num = 1
  const colsCount = CODES.Z-CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el)=> createCol(el, num++ ))
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    num = 1
    const cells = new Array(colsCount)
        .fill('')
        .map((el)=> createCell(num++))
        .join('')
    rows.push(createRow(cells, i+1))
  }
  return rows.join('')
}
