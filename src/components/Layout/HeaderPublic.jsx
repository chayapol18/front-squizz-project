import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.div`
  /* STYLE HERE */
`

function HeaderPublic() {
  return (
    <HeaderStyled className="header-public">
      <h2>HEADER PUBLIC COMPONENT</h2>
    </HeaderStyled>
  )
}

export default HeaderPublic
