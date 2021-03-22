import React, { useState } from 'react'
import IconButton from './IconButton'
import ContentPopup from './ContentPopup'
import styled from 'styled-components'
const Wrapper = styled(IconButton)`
  position: absolute;
  right: 100px;
  top: 25px;
  pointer-events: all;
`
export default () => {
  return (
    <div>
      <Wrapper className='content-button' id='contentBtn' onClick={() => console.log('settings')}>
        <span className="show-for-sr">Settings</span>
        <span aria-hidden="true">
            <img src="images/icons/settings.png" alt='settings' className = "settingbutton"/>
        </span>
      </Wrapper>
    </div>
  )
}
