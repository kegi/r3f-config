import { useState, useMemo } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import { StylesProvider } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'

import ConfigCategory from './ConfigCategory'
import { useAllConfig } from '../core/config.hooks'

const useStyles = makeStyles({
  settingsIcon: {
    position: 'fixed',
    top: 0,
    right: 0,
    margin: '0.5rem',
  },
  closeIcon: {
    position: 'fixed',
    margin: '.5rem 0 0 -50px',
  },
  configContainer: {
    width: 350,
    height: '100vh',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
  },
})

interface ConfigProps {
  open?: boolean
}

const Config: React.FC<ConfigProps> = ({
  open = false,
}) => {
  const [drawerOpened, setDrawerOpened] = useState(open)
  const [sectionOpened, setSectionOpened] = useState<string | undefined>(undefined)
  const { categories } = useAllConfig()
  const classes = useStyles()

  const categoriesKeys = useMemo(() => {
    return Object.keys(categories)
  }, [categories])

  const hasOneCategory = useMemo(() => {
    return categoriesKeys.length === 1
  }, [categoriesKeys])

  const toggleDrawer = () => { setDrawerOpened(isOpened => !isOpened) }

  const onSectionToggle = (key: string) => {
    if (sectionOpened === key) {
      setSectionOpened(undefined)
      return
    }
    setSectionOpened(key)
  }

  if (categoriesKeys.length === 0) {
    return null
  }

  return (
    <StylesProvider injectFirst>
      { !drawerOpened && (
        <Fab
          size="small"
          className={classes.settingsIcon}
          onClick={toggleDrawer}
        >
          <SettingsIcon />
        </Fab>
      ) }

      <Drawer
        open={drawerOpened}
        anchor="right"
        variant="persistent"
        className="config-drawer"
      >
        <Fab
          size="small"
          className={classes.closeIcon}
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </Fab>

        <div className={classes.configContainer}>

          { categoriesKeys.map((categoryKey) => (
            <ConfigCategory
              key={categoryKey}
              categoryKey={categoryKey}
              open={hasOneCategory || sectionOpened === categoryKey}
              collapsable={!hasOneCategory}
              onToggle={onSectionToggle}
            />
          )) }

        </div>
      </Drawer>
    </StylesProvider>
  )
}

export default Config
