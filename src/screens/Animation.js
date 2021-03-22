import React, { useEffect } from 'react'
import ChapterService from '../services/ChapterService'
import VideoPlayer from '../components/VideoPlayer'
import BackButton from '../components/BackButton'
import NavigationService from '../services/NavigationService'
import AudioService from '../services/AudioService'
import styled from 'styled-components'
import _ from 'lodash'
const Wrapper = styled.div`
  height: 100%;
  .video-player {
    width: 100%;
    height: auto;
    pointer-events: none;
  }
`
export default ({ match, history }) => {
  const { chapter } = ChapterService.useContainer()
  const { setMuteBackground } = AudioService.useContainer()
  const animation = _.find(chapter.animation, animation => animation.id === match.params.animationId)
  useEffect(() => {
    setMuteBackground(true)
    return function () {
      setMuteBackground(false)
    }
  }, [])
  if (animation === undefined) {
    return null
  }
  const handleEnd = () => {
    history.goBack()
  }
  return (
    <Wrapper>
      <VideoPlayer
        video={animation.video}
        volume={1}
        mute={false}
        autoPlay={true}
        onEnd={() => handleEnd()}
        className='video-player'
      />
      <BackButton/>
    </Wrapper>
  )
}
