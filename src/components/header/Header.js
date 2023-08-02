/* eslint-disable linebreak-style */
import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'
import {ActiveRoute} from '../../core/routes/ActiveRoute'
import {debounce} from '../../core/utils'
import {changeTableName} from '../../redux/actions'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatchStore(changeTableName($target.text))
  }
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.delete) {
      const decision = confirm('Вы действительно хотите удалить эту таблицу')
      if (decision) {
        localStorage.removeItem('excel:'+ ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.exit) {
      ActiveRoute.navigate('')
    }
  }

  prepare() {
    this.onInput = debounce(this.onInput.bind(this), 300)
  }

  toHTML() {
    return `
    <input type="text" class="input" value="${this.store.getState().tableName}">
      <div>
          <div class="button" data-delete="1">
              <span class="material-symbols-outlined" data-delete="1">
                  delete
              </span>
          </div>
          <div class="button" data-exit="1">
              <span class="material-symbols-outlined" data-exit="1">
                  logout
              </span>
          </div>
      </div>
    `
  }
}
