import React, { useState } from 'react'
import IconButton from './IconButton'
import ContentPopup from './ContentPopup'
import styled from 'styled-components'
const Wrapper = styled(IconButton)`
  position: absolute;
  right: 100px;
  top: 25px;
`
export default ({}) => {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  return (
    <div>
      <Wrapper className='content-button' id='contentBtn' onClick={() => setShow(true)}>
        <span className="show-for-sr">Content</span>
        <span aria-hidden="true">
            <img src="images/icons/content.png" alt='content' className = "settingbutton"/>
        </span>
      </Wrapper>
      <ContentPopup show={show} onClose={handleClose}/>
    </div>
  )
}
