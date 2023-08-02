/* eslint-disable linebreak-style */

export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this._state = rootReducer({...initialState}, {type: '_INIT_'})
    this._listeners = []
  }
  subscribe(fn) {
    const that = this
    this._listeners.push(fn)
    return {
      unsubscribe() {
        that._listeners = that._listeners.filter((lis) => lis !== fn)
      }
    }
  }
  dispatch(action) {
    this._state = this.rootReducer(this._state, action)
    this._listeners.forEach((listener) => listener(this._state))
  }
  getState() {
    return JSON.parse(JSON.stringify(this._state))
  }
}
