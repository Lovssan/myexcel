/* eslint-disable linebreak-style */
import {defaultStyles} from '../../constants'
import {ExcelComponent} from '../../core/ExcelComponent'
import {$} from '../../core/dom'
import {parse} from '../../core/parse'
import {matrix, nextSelector} from '../../core/utils'
import * as actions from '../../redux/actions'
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
    return createTable(10, this.store.getState())
  }
  async resizeTable(e) {
    try {
      const data = await toResize(e, this.$root)
      this.$dispatchStore(actions.tableResize(data))
    } catch (e) {
      console.warn(e)
    }
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeTable(event)
    } else if (event.target.dataset.id) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(current, target)
            .map((id) => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
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
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.updateTextInStore($(event.target).text)
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$dispatch('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatchStore(actions.changeStyles(styles))
    this.updateTextInStore($cell.text)
  }
  updateTextInStore(value) {
    this.$dispatchStore(actions.changeText({
      value,
      id: this.selection.current.id()
    }))
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    this.selectCell(this.$root.find(`[data-id="0:0"]`))
    this.$on('formula:input', (data) =>{
      this.selection.current
          .attr('data-value', data)
          .text = parse(data)
      this.updateTextInStore(data)
    })
    this.$on('formula:focus', () =>
      this.selection.current.focus())
    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style)
      this.$dispatchStore(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIDS
      }))
    })
  }
}
