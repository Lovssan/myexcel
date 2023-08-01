/* eslint-disable linebreak-style */
import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>
    `
  }
  init() {
    super.init()
    this.$formula = this.$root.find('.input')
    this.$on('table:select', (data) => {
      this.$formula.text = data.data.value
    })
  }

  onInput(event) {
    const text = event.target.textContent.trim()
    this.$dispatch('formula:input', text)
  }
  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$dispatch('formula:focus')
    }
  }
  storeChanged({currentText}) {
    this.$formula.text = currentText
  }
}

