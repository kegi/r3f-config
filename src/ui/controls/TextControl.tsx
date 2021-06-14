import TextField from '@material-ui/core/TextField'
import React from 'react'

import { ConfigBaseControls, TextConfig } from '../../types'

interface TextControlProps extends ConfigBaseControls {
  config: TextConfig
  value?: string
}

const TextControl: React.FC<TextControlProps> = ({
  config,
  value = '',
  onChange,
}) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <TextField
      value={value}
      placeholder={config.name}
      size="small"
      onChange={onInputChange}
    />
  )
}

export default TextControl
