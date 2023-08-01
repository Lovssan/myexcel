/* eslint-disable linebreak-style */
import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'
import {debounce} from '../../core/utils'
import {changeTableName} from '../../redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }
  onInput(event) {
    console.log('input')
    const $target = $(event.target)
    this.$dispatchStore(changeTableName($target.text))
  }

  prepare() {
    this.onInput = debounce(this.onInput.bind(this), 300)
  }

  toHTML() {
    return `
    <input type="text" class="input" value="${this.store.getState().tableName}">
      <div>
          <div class="button">
              <span class="material-symbols-outlined">
                  delete
              </span>
          </div>
          <div class="button">
              <span class="material-symbols-outlined">
                  logout
              </span>
          </div>
      </div>
    `
  }
}
