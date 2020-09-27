import styled from 'styled-components'
import { makeStyles, Toolbar } from '@material-ui/core'

export const ToolbarStyled = styled(Toolbar)`
  height: 100px;
`

export const Title = styled.div`
  text-decoration: none;
`

export const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))
