import Slider from '@material-ui/core/Slider'

import { ConfigBaseControls, SliderConfig } from '../../types'

interface SliderControlProps extends ConfigBaseControls {
  config: SliderConfig
  value?: number
}

const SliderControl: React.FC<SliderControlProps> = ({
  config,
  value = 0,
  onChange,
}) => {
  const onSliderChange = (_event: any, value: number | number[]) => {
    onChange(value)
  }

  return (
    <Slider
      value={value}
      min={config.min}
      max={config.max}
      step={config.step}
      track={config.track === false ? false : undefined}
      valueLabelDisplay={config.label === false ? 'off' : 'auto'}
      onChange={onSliderChange}
    />
  )
}

export default SliderControl
