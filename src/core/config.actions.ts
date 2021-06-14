import { Config, ConfigCategory } from '../types'
import { parseConfigKey } from './config.utils'

export const SET_CONFIG_CATEGORY_ACTION = 'SET_CONFIG_CATEGORY_ACTION'
export const SET_CONFIG_ACTION = 'SET_CONFIG_ACTION'
export const SET_CONFIG_VALUE_ACTION = 'SET_CONFIG_VALUE_ACTION'

/* actions types */

interface SetConfigCategory {
  type: typeof SET_CONFIG_CATEGORY_ACTION
  categoryKey: string
  category: Partial<Omit<ConfigCategory, 'configs'>>
}

interface SetConfigAction {
  type: typeof SET_CONFIG_ACTION
  categoryKey: string
  configKey: string
  config: Partial<Config>
}

interface SetConfigValueAction {
  type: typeof SET_CONFIG_VALUE_ACTION
  category: string
  key: string
  value: any
}

export type ConfigActions = SetConfigCategory | SetConfigAction | SetConfigValueAction

/* pure actions */

export const setCategory = (categoryKey: string, category: Omit<ConfigCategory, 'configs'>): SetConfigCategory => ({
  type: SET_CONFIG_CATEGORY_ACTION,
  categoryKey,
  category,
})

export const setConfig = (configKey: string, config: Partial<Config>): SetConfigAction => {
  const [categoryKey, key] = parseConfigKey(configKey)
  return {
    type: SET_CONFIG_ACTION,
    categoryKey,
    configKey: key,
    config,
  }
}

export const setConfigValue = (configKey: string, value: any): SetConfigValueAction => {
  const [category, key] = parseConfigKey(configKey)
  return {
    type: SET_CONFIG_VALUE_ACTION,
    category,
    key,
    value,
  }
}
