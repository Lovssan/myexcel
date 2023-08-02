/* eslint-disable linebreak-style */
import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE,
  TABLE_NAME, UPDATE_DATE} from './types'


export function rootReducer(state, action) {
  let field
  switch (action.type) {
    case TABLE_RESIZE: {
      field = action.payload.type === 'col'?'colState':'rowState'
      return {...state, [field]: value(state, field, action)}
    }
    case CHANGE_TEXT: {
      field = 'dataState'
      return {
        ...state,
        currentText: action.payload.value,
        [field]: value(state, field, action)
      }
    }
    case CHANGE_STYLES: {
      return {
        ...state,
        currentStyles: action.payload
      }
    }
    case APPLY_STYLE: {
      field = 'stylesState'
      const val = state[field] || {}
      action.payload.ids.forEach((id) => {
        val[id] = {...val[id], ...action.payload.value}
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.payload.value}
      }
    }
    case TABLE_NAME: {
      return {...state, tableName: action.payload}
    }
    case UPDATE_DATE: {
      return {...state, date: action.payload}
    }
    default: {
      return state
    }
  }
}

function value(state, field, action) {
  const val = {...state[field]}
  val[action.payload.id] = action.payload.value
  return val
}
