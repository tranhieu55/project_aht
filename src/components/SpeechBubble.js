import React, { useState, useEffect } from 'react'
import SplitText from 'react-pose-text'
import ReactPlayer from 'react-player'
import AudioService from '../services/AudioService'
import styled from 'styled-components'
import posed from 'react-pose'
const LeftSpeechBubble = styled.div`
  font-size:28px;
  margin-right: auto;
  margin-left: -50px;
  padding: 15px;
  position: relative;
	background: #5DAA86;
	border-radius: .4em;
  &:after {
    content: '';
  	position: absolute;
  	left: 0;
  	top: 50%;
  	width: 0;
  	height: 0;
  	border: 28px solid transparent;
  	border-right-color: #5DAA86;
  	border-left: 0;
  	border-bottom: 0;
  	margin-top: -14px;
  	margin-left: -28px;
  }
`
const RightSpeechBubble = styled.div`
  font-size:28px;
  margin-left: auto;
  margin-right: -50px;
  padding: 15px;
  position: relative;
  background: #5DAA86;
  border-radius: .4em;
  &:after {
    content: '';
  	position: absolute;
  	right: 0;
  	top: 50%;
  	width: 0;
  	height: 0;
  	border: 28px solid transparent;
  	border-left-color: #5DAA86;
  	border-right: 0;
  	border-bottom: 0;
  	margin-top: -14px;
  	margin-right: -28px;
  }
`
const CenterSpeechBubble = styled.div`
  font-size:18px;
  margin: auto;
  padding: 15px;
  position: relative;
  background: #5DAA86;
  border-radius: .4em;
  &:after {
    content: '';
  	position: absolute;
  	top: 0;
  	left: 50%;
  	width: 0;
  	height: 0;
  	border: 20px solid transparent;
  	border-bottom-color: #5DAA86;
  	border-top: 0;
  	margin-left: -20px;
  	margin-top: -20px;
  }
`
const charPoses = {
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}
const TypeWriter = posed.div({
  exit: {
  x: '-100%'
  },
  enter: {
    x: '0%',
    beforeChildren: true,
    staggerChildren: 75
  }
})
export default ({ text, onTextEnd, audio, onAudioEnd, className, alignment }) => {
  const { volume, mute } = AudioService.useContainer()
  const [dialogue, setDialogue] = useState(text)
  const [show, setShow] = useState(true)
  useEffect(() => {
    setDialogue(text)
    if (dialogue === text) {
      setShow(true)
    }
  }, [dialogue, text])
  const handleEnd = () => {
    if (onAudioEnd !== undefined) {
      setShow(false)
      onAudioEnd()
    }
  }
  const handlePoseComplete = (pose) => {
    if (pose === undefined) {
      return
    }
    if (onTextEnd !== undefined && audio === null) {
      setShow(false)
      onTextEnd()
    }
  }
  if (text === undefined || text === null || !show) {
    return null
  } else if (alignment === "left") {
    return (
      <LeftSpeechBubble className={className}>
        <TypeWriter initialPose='exit' pose='enter' onPoseComplete={(pose) => handlePoseComplete(pose)}>
          <SplitText charPoses={charPoses}>
            { text }
          </SplitText>
          <ReactPlayer
            url={audio}
            volume={volume}
            muted={mute}
            playing
            height={0}
            width={0}
            onEnded={() => handleEnd()}
          />
        </TypeWriter>
      </LeftSpeechBubble>
    )
  } else if (alignment === "right") {
    return (
      <RightSpeechBubble className={className}>
        <TypeWriter initialPose='exit' pose='enter' onPoseComplete={(pose) => handlePoseComplete(pose)}>
          <SplitText charPoses={charPoses}>
            { text }
          </SplitText>
          <ReactPlayer
            url={audio}
            volume={volume}
            muted={mute}
            playing
            height={0}
            width={0}
            onEnded={() => handleEnd()}
          />
        </TypeWriter>
      </RightSpeechBubble>
    )
  } else {
    return (
      <CenterSpeechBubble className={className}>
        <TypeWriter initialPose='exit' pose='enter' onPoseComplete={(pose) => handlePoseComplete(pose)}>
          <SplitText charPoses={charPoses}>
            { text }
          </SplitText>
          <ReactPlayer
            url={audio}
            volume={volume}
            muted={mute}
            playing
            height={0}
            width={0}
            onEnded={() => handleEnd()}
          />
        </TypeWriter>
      </CenterSpeechBubble>
    )
  }

}
