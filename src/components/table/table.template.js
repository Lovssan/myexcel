/* eslint-disable linebreak-style */
import {defaultStyles} from '../../constants'
import {parse} from '../../core/parse'
import {toInlineStyles} from '../../core/utils'

const CODES = {
  A: 65,
  Z: 90
}
function createCell(row, state) {
  return function(_, index) {
    const id = `${row}:${index}`
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
      <div class="cell"
           contenteditable
           data-col="${index}"
           data-id=${id}
           data-value="${data || ''}"
           style="${styles}; ${getWidth(index, state)}">${parse(data)}</div>
    `
  }
}
function createCol(content, index, width) {
  return `
    <div class="column" data-resized="resized"
      data-col="${index}" style="${width}">
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}
function createRow(content, str = '', state) {
  const attributes = str ?`data-resized="resized" data-row="${str}"
    style="${getHeight(str, state)}"`: ''
  return `
    <div class="row" ${attributes}>
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

function getHeight(i, state) {
  return state.rowState[i]
      ? `height: ${state.rowState[i]}px` : ''
}

function getWidth(i, state) {
  return state.colState[i]
      ? `width: ${state.colState[i]}px` : ''
}

export function createTable(rowsCount = 30, state = {}) {
  const colsCount = CODES.Z-CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el, index) => {
        const width = getWidth(index, state)
        return createCol(el, index, width)
      })
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(i, state))
        .join('')
    rows.push(createRow(cells, i+1, state))
  }
  return rows.join('')
}
