/* eslint-disable linebreak-style */
import {Observer} from '../../core/Observer'
import {StoreSubscribe} from '../../core/StoreSubscriber'
import {$} from '../../core/dom'
import {updateDate} from '../../redux/actions'

export class Excel {
  constructor(options) {
    this.components = options.components|| []
    this.store = options.store
    this.observer = new Observer()
    this.subscriber = new StoreSubscribe(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      observer: this.observer,
      store: this.store
    }
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    });
    return $root
  }
  init() {
    const date = new Date()
    this.store.dispatch(updateDate(date.toLocaleString()))
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach( (component) => component.init() )
  }

  destroy() {
    this.subscriber.unSubscribe()
    this.components.forEach((component) => component.destroy())
  }
}
