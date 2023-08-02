/* eslint-disable linebreak-style */

import {storage} from '../core/utils'


function toHTML(el) {
  const path = el.replace(/[:]/g, '/')
  const data = storage(el)
  return `
    <li class="db__record">
      <a href="#${path}">${data.tableName}</a>
      <strong>${data.date}</strong>
    </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p style="text-align: center">Записей нет</p>`
  }

  return `
      <div class="db__list-header">
          <span>Название</span>
          <span>Дата открытия</span>
      </div>
      <ul class="db__list">
        ${keys.sort((a, b)=>a-b).map(toHTML).join('')}
      </ul>
  `
}
