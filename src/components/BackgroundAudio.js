import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import AudioService from '../services/AudioService'
import ContentService from '../services/ContentService'

export default () => {
  const { muteBackground, mute, volume } = AudioService.useContainer()
  const { content } = ContentService.useContainer()
  return (
    <ReactPlayer url={content.background} playing={true} loop muted={muteBackground || mute} volume={0.05} height={0} width={0}/>
  )
}
