import { Button, makeStyles } from '@material-ui/core'
import styled from 'styled-components'

export const DrawerContainer = styled.div`
  overflow: auto;
`
export const ButtonMenu = styled(Button)`
  justify-content: flex-start;
  padding: 10px 20px;
  text-transform: none;
  width: 100%;
`

export const Span = styled.span`
  margin-auto: auto;
`

export const useStyles = makeStyles(() => ({
  listMargin: {
    marginTop: 120,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
}))
