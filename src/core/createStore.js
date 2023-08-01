/* eslint-disable linebreak-style */

// export function createStore(rootReducer, initialState = {}) {
//   let state = rootReducer({...initialState}, {type: '_INIT_'})
//   let listeners = []
//   return {
//     subscribe(fn) {
//       listeners.push(fn)
//       return {
//         unsubscribe() {
//           listeners = listeners.filter((lis) => lis !== fn)
//         }
//       }
//     },
//     dispatch(action) {
//       state = rootReducer(state, action)
//       listeners.forEach((listener) => listener(state))
//     },
//     getState() {
//       return state
//     }
//   }
// }

export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this._state = rootReducer({...initialState}, {type: '_INIT_'})
    this._listeners = []
  }
  subscribe(fn) {
    this._listeners.push(fn)
    return {
      unsubscribe() {
        this._listeners = this._listeners.filter((lis) => lis !== fn)
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
