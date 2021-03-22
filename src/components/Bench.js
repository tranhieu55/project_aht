import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  width: 100%;
  bottom: 0;
  height: 250px;
  position: absolute;
  background-image: url(${'/assets/media/images/background/bench.png'}); /* The image used */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  @media screen and (min-width: 1200px) and (max-width: 1600px) {
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 150px;
  }
`
export default ({ children, className }) => {
  return (
    <Wrapper className={className}>
      { children }
    </Wrapper>
  )
}
