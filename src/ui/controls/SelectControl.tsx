import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'

import { ConfigBaseControls, SelectConfig } from '../../types'

interface SelectControlProps extends ConfigBaseControls {
  config: SelectConfig
  value?: string
}

const SelectControl: React.FC<SelectControlProps> = ({
  config,
  value = '',
  onChange,
}) => {
  const onSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value)
  }

  return (
    <Select
      value={value}
      defaultValue={value}
      onChange={onSelectChange}
      displayEmpty
      fullWidth
    >
      { Object.entries(config.options).map(([key, value]) => (
        <MenuItem key={key} value={key}>{ value }</MenuItem>
      )) }
    </Select>
  )
}

export default SelectControl
