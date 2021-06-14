import { ConfigStore } from '../types'
import { parseConfigKey } from './config.utils'

export const categoryExists = (categoryKey: string) => (state: ConfigStore) => {
  return !!state.config[categoryKey]
}

export const configExists = (configKey: string) => (state: ConfigStore) => {
  const [categoryKey, key] = parseConfigKey(configKey)
  return !!state.config[categoryKey]?.configs[key]
}

export const getCategories = () => (state: ConfigStore) => {
  return state.config
}

export const getCategory = (categoryKey: string) => (state: ConfigStore) => {
  return state.config[categoryKey]
}

export const getConfig = (configKey: string) => (state: ConfigStore) => {
  const [categoryKey, key] = parseConfigKey(configKey)
  return state.config[categoryKey]?.configs[key]
}

export const getConfigValues = () => (state: ConfigStore) => {
  return state.configValues
}

export const getConfigValue = (configKey: string, defaultValue: any) => (state: ConfigStore) => {
  const [categoryKey, key] = parseConfigKey(configKey)
  const configValue = state.configValues[categoryKey]?.[key]
  return typeof configValue !== 'undefined' ? configValue : defaultValue
}
