import { Card, CardContent } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { WrapperDiv, Title } from './styles'

function MainWrapper({ children, title }) {
  return (
    <WrapperDiv>
      <Card variant="outlined">
        <CardContent>
          <Title variant="h3">{title}</Title>
          {children}
        </CardContent>
      </Card>
    </WrapperDiv>
  )
}

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default MainWrapper
