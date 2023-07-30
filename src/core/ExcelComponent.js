/* eslint-disable linebreak-style */
import {DomListener} from '@core/DOMListener'

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.unsubscribes = []
    this.prepare()
  }
  prepare() {

  }

  $dispatch(event, ...args) {
    this.observer.dispatch(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.observer.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListener()
    this.unsubscribes.forEach((unsub)=> unsub())
  }
}
