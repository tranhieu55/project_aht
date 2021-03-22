import React from 'react'
import IconButton from './IconButton'
import styled from 'styled-components'
import AudioService from '../services/AudioService'
const Wrapper = styled(IconButton)`
  position: absolute;
  right: 25px;
  top: 25px;
  pointer-events: all;
`
export default () => {
  const {
    mute,
    setMute
  } = AudioService.useContainer()
  return (
    <Wrapper className='mute-button' id='muteBtn' onClick={() => setMute(!mute)}>
      <span className="show-for-sr">Mute</span>
      <span aria-hidden="true">
          <img
            src={mute ? "/images/icons/mute.png" : "/images/icons/unmute.png"}
            alt={mute ? "mute" : "unmute"}
            className = "settingbutton"
          />
      </span>
    </Wrapper>
  )
}
