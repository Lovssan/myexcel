/* eslint-disable linebreak-style */
import {capitalize} from './utils'

export class DomListener {
  constructor($root, listeners =[]) {
    if (this.$root) {
      throw new Error(`No $root providedfor DOMListener `)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener)=>{
      const method = capitalize(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not defined in ${this.name || ''} Component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener)=>{
      const method = capitalize(listener)
      this.$root.off(listener, this[method])
    })
  }
}
