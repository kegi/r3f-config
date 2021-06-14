const defaultConfigCategory = ''

export const parseConfigKey = (configKey: string) => {
  const keys = configKey.split('.')
  return keys.length === 1 ? [defaultConfigCategory, keys[0]] : keys
}

export const buildConfigKey = (category: string, config: string) => {
  return [category, config].join('.')
}

export const nameFromKey = (key: string) => {
  const name = key.replace(/([A-Z\-_.])/g, ' $1').toLocaleLowerCase()
  return name.charAt(0).toLocaleUpperCase() + name.slice(1)
}
