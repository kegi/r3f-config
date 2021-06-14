import Switch from '@material-ui/core/Switch'

import { ConfigBaseControls, SwitchConfig } from '../../types'

interface SwitchControlProps extends ConfigBaseControls {
  config: SwitchConfig
  value?: boolean
}

const SwitchControl: React.FC<SwitchControlProps> = ({
  value = false,
  onChange,
}) => {
  const onSwitchChange = (_event: any, newValue: boolean) => {
    onChange(newValue)
  }

  return (
    <Switch
      checked={value}
      onChange={onSwitchChange}
      color="primary"
    />
  )
}

export default SwitchControl
