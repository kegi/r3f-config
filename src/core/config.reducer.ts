import produce from 'immer'

import {
  ConfigActions,
  SET_CONFIG_CATEGORY_ACTION,
  SET_CONFIG_ACTION,
  SET_CONFIG_VALUE_ACTION,
} from './config.actions'
import { ConfigStore } from '../types'

export const defaultState: ConfigStore = {
  config: {},
  configValues: {},
}

export const reducer = (state: ConfigStore = defaultState, action: ConfigActions) => {
  switch (action.type) {
    case SET_CONFIG_CATEGORY_ACTION:
      return produce(state, newState => {
        newState.config[action.categoryKey] = {
          ...newState.config[action.categoryKey] || { configs: {} },
          ...action.category,
        }
      })

    case SET_CONFIG_ACTION:
      return produce(state, newState => {
        if (!newState.config[action.categoryKey]) {
          newState.config[action.categoryKey] = { configs: {} }
        }
        if (!newState.config[action.categoryKey].configs[action.configKey]) {
          newState.config[action.categoryKey].configs[action.configKey] = {}
        }
        newState.config[action.categoryKey].configs[action.configKey] = {
          ...newState.config[action.categoryKey].configs[action.configKey],
          ...action.config,
        }
        if (!newState.configValues[action.categoryKey]) {
          newState.configValues[action.categoryKey] = {}
        }
        if (typeof newState.configValues[action.categoryKey][action.configKey] === 'undefined') {
          newState.configValues[action.categoryKey][action.configKey] = action.config.defaultValue
        }
      })

    case SET_CONFIG_VALUE_ACTION:
      return produce(state, newState => {
        newState.configValues[action.category][action.key] = action.value
      })

    default:
      return state
  }
}
