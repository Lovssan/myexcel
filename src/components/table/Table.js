/* eslint-disable linebreak-style */
import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'
import {matrix, nextSelector} from '../../core/utils'
import {TableSelection} from './TableSelection'
import {toResize} from './table.resize'
import {createTable} from './table.template'

export class Table extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  static className = 'excel__table'
  toHTML() {
    return createTable()
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      toResize(event, this.$root)
    } else if (event.target.dataset.id) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(current, target)
            .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
      this.$dispatch('table:select', this.selection.current.text)
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
      this.$dispatch('table:select', this.selection.current.text)
    }
  }
  onInput(event) {
    this.$dispatch('table:input', $(event.target).text)
  }
  init() {
    super.init()
    this.selection = new TableSelection()
    this.selection.select(this.$root.find(`[data-id="0:0"]`))
    this.$on('formula:input', (data) =>
      this.selection.current.text = data)
    this.$on('formula:focus', () =>
      this.selection.current.focus())
    this.$dispatch('table:select', this.selection.current.text)
  }
}
