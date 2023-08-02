/* eslint-disable linebreak-style */
import {DomListener} from '@core/DOMListener'

export class ExcelComponent extends DomListener {
  constructor($root, options={}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribes = []
    this.prepare()
    // this.storeSub = null
  }
  prepare() {
  }

  storeChanged() {
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $dispatchStore(action) {
    this.store.dispatch(action)
  }

  $dispatch(event, ...args) {
    this.observer.dispatch(event, ...args)
  }

  $on(event, fn) {
    this.observer.subscribe(event, fn)
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
    this.unsubscribes.forEach((unsub)=> unsub())
  }
}
