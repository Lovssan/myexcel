/* eslint-disable linebreak-style */
export class Observer {
  constructor() {
    this.listeners = {}
  }
  dispatch(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener) => {
        listener(...args)
      })
    }
  }

  subscribe(event, fn) {
    this.listeners[event]= this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event]
          .filter((listener) => listener !== fn)
    }
  }
}

