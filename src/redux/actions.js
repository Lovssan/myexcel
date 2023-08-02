/* eslint-disable linebreak-style */
import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE,
  TABLE_NAME, UPDATE_DATE} from './types'

export const tableResize = (payload) => ({
  type: TABLE_RESIZE,
  payload
})

export const changeText = (payload) => ({
  type: CHANGE_TEXT,
  payload
})

export const changeStyles = (payload) => ({
  type: CHANGE_STYLES,
  payload
})

export const applyStyle = (payload) => ({
  type: APPLY_STYLE,
  payload
})

export const changeTableName = (payload) => ({
  type: TABLE_NAME,
  payload
})

export const updateDate = (payload) => ({
  type: UPDATE_DATE,
  payload
})


