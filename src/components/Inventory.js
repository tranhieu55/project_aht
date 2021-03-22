import React from 'react'
import ToolGroup from './ToolGroup'
import styled from 'styled-components'
import posed from 'react-pose'
const Wrapper = styled.div`
  background-image: url(${'/assets/media/images/background/inventory.png'}); /* The image used */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  height: 150px;
  width: 450px;
  margin: auto;
  .items {
    position: relative;
    padding: 20px 40px;
  }
  .items img{
    width: 7rem;
    padding: 1rem;
    margin-right: 1rem;
  }
  .tool {
    padding: 25px;
    background: transparent;
    border: none;
    outline: none;
    img {
      width: 75px;
      height: auto;
      margin: 0;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 100px;
      }
    }
  }
`
const Inventory = posed(Wrapper)({
  enterTop: {
    y: -100,
    opacity: 0,
    transition: { duration: 2000 }
  },
  exitTop: {
    y: -100,
    opacity: 0,
    transition: { duration: 1000 }
  },
  stationary: {
    y: 0,
    opacity: 1,
    transition: { duration: 1000 }
  }
})
export default ({ tools, onAdd, onRemove, onUse }) => {
  return (
    <Inventory
      initialPose={'enterTop'}
      pose={'stationary'}
    >
      <ToolGroup
        tools={tools}
        className='items'
        toolClassName='tool'
        alignment='center'
        justify='flex-start'
        interactable='true'
        onUse={onUse}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </Inventory>
  )
}
