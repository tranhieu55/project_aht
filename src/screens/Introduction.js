import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import ContentService from "../services/ContentService";
import NavigationService from "../services/NavigationService";
import PrimaryButton from "../components/PrimaryButton";
import AudioService from '../services/AudioService'
import styled from "styled-components";
const Wrapper = styled.div`
  height: 100%;
  .video-player {
    width: 100%;
    height: auto;
    pointer-events: none;
  }
  .skip-button {
    position: absolute;
    bottom: 100px;
    right: 25px;
    pointer-events: all;
  }
`;
const Introduction = ({ history }) => {
  const { content } = ContentService.useContainer();
  const { setSkipCallback, setShowSkip } = NavigationService.useContainer();
  const {mute, setMuteBackground } = AudioService.useContainer()

  setShowSkip(true);
  setSkipCallback(function() {
    history.push("/level-select");
  });
  const handleEnd = () => {
    history.push("/level-select");
  };
  return (
    <Wrapper>
      <VideoPlayer
        video={content.introduction}
        mute={mute}
        autoPlay={true}
        onEnd={handleEnd}
        className="video-player"
        width={1760}
        height={1088}
        volume={1}
      />
      <PrimaryButton
        onClick={() => history.push("/level-select")}
        className="skip-button"
      >
        SKIP
      </PrimaryButton>
    </Wrapper>
  );
};
export default Introduction;
