import { useEffect } from 'react'
import { ConfigCategory, Config } from '../types'
import { useConfigDispatch, useConfigState } from './config.context'

import {
  setCategory,
  setConfig,
  setConfigValue,
} from './config.actions'

import {
  categoryExists,
  configExists,
  getCategories,
  getCategory,
  getConfig,
  getConfigValues,
  getConfigValue,
} from './config.selectors'

type CategoryData = Omit<ConfigCategory, 'configs'>

export const useAllConfig = () => {
  return {
    categories: useConfigState(getCategories()),
    values: useConfigState(getConfigValues()),
  }
}

export const useConfigCategory = (categoryKey: string, category?: CategoryData) => {
  const dispatch = useConfigDispatch()

  const exists = useConfigState(categoryExists(categoryKey))

  useEffect(() => {
    if (!exists) {
      if (!category) {
        throw new Error(`Invalid category : ${categoryKey}`)
      }
      dispatch(setCategory(categoryKey, category))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getter = useConfigState(getCategory(categoryKey))
  const setter = (updatedCategory: Partial<CategoryData>) => dispatch(setCategory(categoryKey, updatedCategory))

    type ConfigCategoryHook = [ typeof getter, typeof setter ]

    return [getter, setter] as ConfigCategoryHook
}

export const useConfig = (configKey: string, config?: Config) => {
  const dispatch = useConfigDispatch()

  const exists = useConfigState(configExists(configKey))

  useEffect(() => {
    if (!exists && config) {
      dispatch(setConfig(configKey, config))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = useConfigState(getConfig(configKey))
  const setter = (updatedConfig: Partial<Config>) => dispatch(setConfig(configKey, updatedConfig))

    type ConfigHook = [ typeof data, typeof setter ]

    return [data, setter] as ConfigHook
}

export const useConfigValue = (configKey: string, config?: Config) => {
  const dispatch = useConfigDispatch()
  const exists = useConfigState(configExists(configKey))

  useEffect(() => {
    if (!exists && config) {
      dispatch(setConfig(configKey, config))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = useConfigState(getConfigValue(configKey, config?.defaultValue))
  const setter = (value: any) => dispatch(setConfigValue(configKey, value))

    type ConfigHook = [ typeof data, typeof setter ]

    return [data, setter] as ConfigHook
}
