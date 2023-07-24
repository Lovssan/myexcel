import {ExcelComponent} from '../../core/ExcelComponent'
import {toResize} from './table.resize'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'mouseup']
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      toResize(event, this.$root)
    }
  }
  onClick() {
  }
  onMousemove(event) {
  }
  onMouseup(event) {

  }
}
