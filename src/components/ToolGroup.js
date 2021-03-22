import React from 'react'
import Tool from './Tool'
import styled from 'styled-components'
import _ from 'lodash'
const Wrapper = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${props => props.justify};
  align-items: ${props => props.alignment};
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
`
export default({ tools, className, toolClassName, alignment, justify, interactable, onAdd, onRemove, onUse, inventory }) => {
  return (
    <Wrapper justify={justify} alignment={alignment} className={className}>
    {
     
      tools.map((tool, index) => {
        var disable = false
        if ( inventory && inventory.length > 0) {
          var disable = _.find(inventory, t => t.id === tool.id) 
        }
        return (
          <li key={index}>
            <Tool
              tool={tool}
              className={toolClassName}
              interactable={interactable}
              onAdd={onAdd}
              onRemove={onRemove}
              onUse={onUse}
              disable={disable}
            />
          </li>
        )
      })
    }
    </Wrapper>
  )
}
