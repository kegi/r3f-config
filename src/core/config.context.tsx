import React, { useReducer, useMemo, Dispatch, ComponentType } from 'react'
import { createContext, useContext, useContextSelector } from 'use-context-selector'

import { ConfigStore, ConfigSelector } from '../types'
import { ConfigActions } from './config.actions'
import { defaultState, reducer } from './config.reducer'
import Config from '../ui/Config'

interface ConfigContextInterface {
  state: ConfigStore
  dispatch: Dispatch<ConfigActions>
}

interface ConfigProviderProps {
  uiEnabled?: boolean
  open?: boolean
}

const ConfigContext = createContext<ConfigContextInterface>({
  state: defaultState,
  dispatch: () => { throw new Error('Config can only be used inside <ConfigProvider />') },
})

export const useConfigDispatch = () => useContextSelector(ConfigContext, (context: ConfigContextInterface) => context.dispatch)
export const useConfigState = (selector: ConfigSelector) => useContextSelector(ConfigContext, context => selector(context.state))

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  uiEnabled = true,
  open = false,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <ConfigContext.Provider value={value}>
      { children }
      { uiEnabled && <Config open={open} /> }
    </ConfigContext.Provider>
  )
}

/**
 * this HOC is to fix a bug with React and multiple reconcilers by forwarding the context
 * https://github.com/pmndrs/react-three-fiber/issues/262
 */
// eslint-disable-next-line react/display-name
export const withConfig = (ChildComponent: ComponentType<any>): React.FC<any> => ({
  children,
  ...props
}) => (
  <ChildComponent {...props}>
    <ConfigContext.Provider value={useContext(ConfigContext)}>
      { children }
    </ConfigContext.Provider>
  </ChildComponent>
)
