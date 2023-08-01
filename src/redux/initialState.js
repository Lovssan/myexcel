/* eslint-disable linebreak-style */
import {defaultStyles} from '../constants'
import {storage} from '../core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentStyles: defaultStyles,
  currentText: '',
  tableName: 'Новая таблица',
}

const normilized = (state) => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: 'awdwa'
  }
}

export const initialState = storage('excel-state')
    ? normilized(storage('excel-state'))
    :defaultState


