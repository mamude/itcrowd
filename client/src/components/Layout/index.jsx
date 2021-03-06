import React from 'react'
import PropTypes from 'prop-types'
import TopBar from '../TopBar'
import SideMenu from '../SideMenu'
import { Root, Content, ContentContainer, Wrapper } from './styles'

function Layout({ children }) {
  return (
    <Root>
      <TopBar />
      <SideMenu />
      <Wrapper>
        <ContentContainer>
          <Content>{children}</Content>
        </ContentContainer>
      </Wrapper>
    </Root>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
