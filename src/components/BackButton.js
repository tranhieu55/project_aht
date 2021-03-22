import React from 'react'
import PrimaryButton from './PrimaryButton'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components'
const Wrapper = styled(PrimaryButton)`
  position: absolute;
  left: 25px;
  top: 25px;
`
const BackButton = ({ history, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick()
    history.goBack()
  }
  return (
    <Wrapper onClick={handleClick}>
      BACK
    </Wrapper>
  )
}
export default withRouter(BackButton)
