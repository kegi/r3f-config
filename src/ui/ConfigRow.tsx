import React, { useMemo } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'

import { ConfigTypes } from '../types'
import { parseConfigKey, nameFromKey } from '../core/config.utils'
import { useConfig, useConfigValue } from '../core/config.hooks'
import TextControl from './controls/TextControl'
import SelectControl from './controls/SelectControl'
import SliderControl from './controls/SliderControl'
import SwitchControl from './controls/SwitchControl'
import ColorControl from './controls/ColorControl'

interface ConfigRowProps {
  configKey: string
}

const ConfigRow: React.FC<ConfigRowProps> = ({
  configKey,
}) => {
  const [config] = useConfig(configKey)
  const [value, setValue] = useConfigValue(configKey)

  // fixme : remove any and simplify this :

  const control = useMemo(() => {
    switch (config.type) {
      case ConfigTypes.SELECT:
        return (
          <SelectControl
            config={config}
            value={value}
            onChange={setValue}
          />
        )
      case ConfigTypes.SLIDER:
        return (
          <SliderControl
            config={config}
            value={value}
            onChange={setValue}
          />
        )
      case ConfigTypes.SWITCH:
        return (
          <SwitchControl
            config={config}
            value={value}
            onChange={setValue}
          />
        )
      case ConfigTypes.COLOR:
        return (
          <ColorControl
            config={config}
            value={value}
            onChange={setValue}
          />
        )
      default:
        return (
          <TextControl
            config={config}
            value={value}
            onChange={setValue}
          />
        )
    }
  }, [config, setValue, value])

  return (
    <Grid container alignItems="center">
      { config.divider && (
        <Grid item xs={12}>
          <Box paddingY={2}>
            <Divider />
          </Box>
        </Grid>
      ) }

      <Grid item xs={5}>
        <Typography style={{ fontSize: '.8em' }}>
          { config.name || nameFromKey(parseConfigKey(configKey)[1]) }
        </Typography>
      </Grid>
      <Grid item xs={7}>
        { control }
      </Grid>
    </Grid>
  )
}

export default ConfigRow
