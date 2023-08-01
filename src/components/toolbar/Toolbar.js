/* eslint-disable linebreak-style */
import {createToolbar} from './toolbar.template'
import {$} from '../../core/dom'
import {ExcelStateComponents} from '../../core/ExcelStateComponent'
import {defaultStyles} from '../../constants'

export class Toolbar extends ExcelStateComponents {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }
  prepare() {
    this.initState(defaultStyles)
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)


    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)

      this.$dispatch('toolbar:applyStyle', value)
    }
  }
}
