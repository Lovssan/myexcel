/* eslint-disable linebreak-style */
import {defaultStyles} from '../constants'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  tableName: 'Новая таблицa',
  date: date()
}

const normilized = (state) => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: 'awdwa'
  }
}

export const normilizedInitialState = (state) => {
  return state ?normilized(state) :defaultState
}

function date() {
  const date = new Date
  return date.toLocaleString()
}
