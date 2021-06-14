import { useState } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import { ColorPicker, Color, ColorValue } from 'material-ui-color'

import { ConfigBaseControls, ColorConfig } from '../../types'

const useStyles = makeStyles({
  colorPickerContainer: {
    '& .muicc-colorbox-sliders': {
      boxSizing: 'border-box',
    },
    '& .muicc-colorpicker-button': {
      margin: '.10rem 0',
    },
  },
})

interface ColorControlProps extends ConfigBaseControls {
  config: ColorConfig
  value?: string
}

const ColorControl: React.FC<ColorControlProps> = ({
  config,
  value = '',
  onChange,
}) => {
  const [muiColor, setMuiColor] = useState<ColorValue>(value)
  const classes = useStyles()

  const onColorChange = (color: Color) => {
    setMuiColor(color)
    onChange(`#${color.hex}`)
  }

  return (
    <div className={classes.colorPickerContainer}>
      <ColorPicker
        defaultValue={value}
        value={muiColor}
        onChange={onColorChange}
        disableAlpha={!config.enableAlpha}
        hideTextfield
      />
    </div>
  )
}

export default ColorControl
