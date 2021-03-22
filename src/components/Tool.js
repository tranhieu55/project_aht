import React, { useState } from 'react'
import ToolPopup from './ToolPopup'
import ChapterService from '../services/ChapterService'
import styled from 'styled-components'
import posed from 'react-pose'
import _ from 'lodash'
const StyledTool = styled.button`
  background: transparent;
  border: none;
  outline: none !important;
  img {
    pointer-events: ${props => props.pointerEvent};
    cursor: ${props => props.cursorType};
    width: 10rem;
  }
`
const Tool = posed(StyledTool)({
  hoverable: true,
  enter: {
    opacity: 0,
    scale: 0,
    transition: { duration: 1000 }
  },
  exit:  {
    opacity: 1,
    scale: 1,
    transition: { duration: 1000 }
  },
  init: {
    scale: 1
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 0
    }
  }
})
export default ({ tool, className, interactable, onAdd, onRemove, onUse, disable }) => {
  const { inventoryTools } = ChapterService.useContainer()
  const [showPopup, setShowPopup] = useState(false)
  const handleClick = () => {
    if (interactable) {
      setShowPopup(true)
    }
  }
  const handleClose = () => {
    setShowPopup(false)
  }
  return (
    <Tool
      initialPose={'enter'}
      pose={'exit'}
      className={className,"test"}
      pointerEvent={interactable && !disable ? "all" : "none"}
      cursorType={interactable && !disable? "pointer" : "default"}
      disabled={disable}
    >
      <img
        src={disable ? tool.image.empty : tool.image.source}
        alt={tool.image.alt}
        onClick={() => handleClick()}
      />
      <ToolPopup
        tool={tool}
        show={showPopup}
        onClose={handleClose}
        onAdd={onAdd}
        onRemove={onRemove}
        onUse={onUse}
      />
    </Tool>

  )
}
