import React, { useState, useEffect } from 'react'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import IconButton from './IconButton'
import SpeechBubble from './SpeechBubble'
import AudioService from '../services/AudioService'
import NavigationService from '../services/NavigationService'
import ContentService from '../services/ContentService'
import ContentPopup from './ContentPopup'
import styled from 'styled-components'
import posed from 'react-pose'
import { withRouter } from 'react-router-dom';
import { hintDelay } from '../constants'
import _ from 'lodash'
const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  .back-button {
    position: absolute;
    left: 25px;
    top: 25px;
    pointer-events: all;
  }
  .skip-button {
    position: absolute;
    bottom: 100px;
    right: 25px;
    pointer-events: all;
  }
  .mute-button {
    position: absolute;
    right: 25px;
    top: 25px;
    pointer-events: all;
  }
  .setting-button {
    position: absolute;
    right: 100px;
    top: 25px;
    pointer-events: all;
  }
  .content-button {
    position: absolute;
    right: 175px;
    top: 25px;
    pointer-events: all;
  }
  .help-button {
    position: absolute;
    bottom: 25px;
    left: 25px;
    pointer-events: all;
    img {
      width: 65px;
      height: auto;
    }
    .left-speech-bubble {
      position: absolute;
      bottom: 35px;
      left: 160px;
      width: 500px;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 400px;
      }
    }
  }
  .highlight {
    animation: border-flicker 2s linear infinite;
  }
  @keyframes border-flicker {
    0% {
      box-shadow: 0px 0px 10px 5px rgba(240,255,0,0.0);
    }
    20% {
      box-shadow: 0px 0px 10px 5px rgba(240,255,0,0.5);
    }
    40% {
      box-shadow: 0px 0px 10px 5px rgba(240,255,0,1.0);
    }
    60% {
      box-shadow: 0px 0px 10px 5px rgba(240,255,0,1.0);
    }
    80% {
      box-shadow: 0px 0px 10px 5px rgba(240,255,0,0.5);
    }
    100% {
      box-shadow: 0px 0px 10px 5px rgba(240,255,0,0.0);
    }
  }
`
const NavigationController =  ({ history }) => {
  const { muteBackground,mute, setMuteBackground } = AudioService.useContainer()
  const { content } = ContentService.useContainer()
  const hints = content.hints
  const {
    handleBack,
    handleSkip,
    handleHint,
    handleContent,
    showBack,
    setShowBack,
    showHint,
    setShowHint,
    showSkip,
    setShowSkip,
    showContent,
    setShowContent,
    setBackCallback,
    setSkipCallback,
    setHintCallback,
    setContentCallback,
    goBack,
    setGoBack
  } = NavigationService.useContainer()
  const [timer, setTimer] = useState(0)
  const [show, setShow] = useState(false)
  const [hint, setHint] = useState(null)
  const [showHelp, setShowHelp] = useState(false)
  const [path, setPath] = useState(history.location.pathname)
  useEffect(() => {
    setHint(_.find(hints, h => h.path === history.location.pathname))
    if (history.location.pathname !== path) {
      setTimer(0)
      setPath(history.location.pathname)
    }
  }, [history.location.pathname])
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer < hintDelay && !showHelp) {
        setTimer(timer => timer + 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [timer, showHelp])

  const handleMute = () => {
    setMuteBackground(!mute)
  }
  const hideAll = () => {
    setShowBack(false)
    setShowHint(false)
    setShowSkip(false)
    setShowContent(false)
    setTimer(0)
  }
  const onSkip = () => {
    hideAll()
    handleSkip()
  }
  const onBack = () => {
    hideAll()
    handleBack()
    setBackCallback(null)
    if (goBack) {
      history.goBack()
    }
  }
  const onContent = () => {
    setShow(true)
    handleContent()
  }
  const onHelp = () => {
    setTimer(0)
    setShowHelp(!showHelp)
  }
  const handleClose = () => setShow(false)
  return (
    <Wrapper>
      {
        showBack &&
        <SecondaryButton className='back-button' onClick={() => onBack()}>
          Back
        </SecondaryButton>
      }
      <IconButton className='mute-button' id='muteBtn' onClick={() => handleMute}>
        <span className="show-for-sr">Mute</span>
        <span aria-hidden="true">
            <img src="images/icons/mute.png" alt="mute" className = "settingbutton"/>
            <img src="images/icons/unmute.png" alt="unmute" style={{display:"none"}} className = "settingbutton"/>
        </span>
      </IconButton>
      <IconButton className='setting-button' id='settingBtn'>
        <span className="show-for-sr">Settings</span>
        <span aria-hidden="true">
            <img src="images/icons/settings.png" alt='settings'className = "settingbutton"/>
        </span>
      </IconButton>
      {
        showContent &&
        <IconButton className='content-button' id='contentBtn' onClick={() => onContent()}>
          <span className="show-for-sr">Content</span>
          <span aria-hidden="true">
              <img src="images/icons/content.png" alt='content' className = "settingbutton"/>
          </span>
        </IconButton>
      }
      {
        (showHint && (hint !== undefined)) &&
        <IconButton className={`${timer >= hintDelay ? 'highlight' : ''} help-button`} onClick={() => onHelp()}>
          <img src="images/icons/help.png" alt='help'/>
          {
            showHelp  &&
            <SpeechBubble
              className={`left-speech-bubble`}
              alignment='left'
              text={hint.text}
            />
          }
        </IconButton>
      }
      {
        showSkip &&
        <PrimaryButton className='skip-button' onClick={() => onSkip()}>
          Skip
        </PrimaryButton>
      }
      <ContentPopup show={show} onClose={handleClose}/>
    </Wrapper>
  )
}
export default withRouter(NavigationController)
