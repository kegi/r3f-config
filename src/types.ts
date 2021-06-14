/* Config types */

export const ConfigTypes = {
  TEXT: 'text',
  SELECT: 'select',
  NUMBER: 'number',
  SWITCH: 'switch',
  SLIDER: 'slider',
  COLOR: 'color',
}

interface ConfigBase {
  name?: string
  defaultValue?: any
  divider?: boolean
}

export interface TextConfig extends ConfigBase {
  type?: typeof ConfigTypes.TEXT
}

export interface SelectConfig extends ConfigBase {
  type?: typeof ConfigTypes.SELECT
  options: Record<string, string>
}

export interface NumberConfig extends ConfigBase {
  type: typeof ConfigTypes.NUMBER
}

export interface SwitchConfig extends ConfigBase {
  type: typeof ConfigTypes.SWITCH
}

export interface SliderConfig extends ConfigBase {
  type: typeof ConfigTypes.SLIDER
  min: number
  max: number
  step?: number
  track?: boolean
  label?: boolean
}

export interface ColorConfig extends ConfigBase {
  type: typeof ConfigTypes.COLOR
  enableAlpha: boolean
}

export type Config = TextConfig | SelectConfig | NumberConfig | SliderConfig | ColorConfig

/* Category types */

export interface ConfigCategory {
  name?: string
  configs: Record<string, Config>
}

export interface ConfigBaseControls {
  value?: any
  onChange: (value: any) => void
}

/* Store type */

export interface ConfigStore {
  config: Record<string, ConfigCategory>
  configValues: Record<string, Record<string, any>>
}

export type ConfigSelector = (state: ConfigStore) => any
