import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${'/assets/media/images/background/lab.png'}); /* The image used */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  overflow: hidden;
`
export default ({ children }) => {
  return (
    <Wrapper>
      { children }
    </Wrapper>
  )
}
