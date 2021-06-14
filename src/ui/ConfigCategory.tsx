import { useMemo } from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useConfigCategory } from '../core/config.hooks'
import Grid from '@material-ui/core/Grid'

import { nameFromKey, buildConfigKey } from '../core/config.utils'
import ConfigRow from './ConfigRow'

const useStyles = makeStyles({
  categoryTitle: {
    fontSize: '.85em',
    fontWeight: 'bold',
  },
})

interface ConfigCategoryProps {
  categoryKey: string
  open: boolean
  collapsable?: boolean
  onToggle: (key: string) => void
}

const ConfigCategory: React.FC<ConfigCategoryProps> = ({
  categoryKey,
  open,
  collapsable = true,
  onToggle,
}) => {
  const [category] = useConfigCategory(categoryKey)
  const categoryName = category.name || nameFromKey(categoryKey)

  const classes = useStyles()

  const configsKeys = useMemo(() => {
    return Object.keys(category.configs)
  }, [category.configs])

  return (
    <Accordion
      square
      expanded={open}
      onChange={() => collapsable && onToggle(categoryKey)}
    >
      <AccordionSummary
        expandIcon={collapsable && <ExpandMoreIcon />}
      >
        <Typography className={classes.categoryTitle}>
          { categoryName }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column">
          { configsKeys.map((configKey) => {
            const key = buildConfigKey(categoryKey, configKey)
            return (
              <Grid item key={key}>
                <ConfigRow configKey={key} />
              </Grid>
            )
          }) }
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default ConfigCategory
