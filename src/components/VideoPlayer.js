import React, { useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: black;
`;
const VideoPlayer = ({ video, onEnd, mute, volume, autoPlay, width, height}) => {
  const videoPlayer = useRef(null);

  return (
    <Wrapper>
      <ReactPlayer
        url={video}
        width={width}
        height={height}
        onEnded={onEnd}
        playing={true}
        volume={volume}
        muted={mute}
        ref={videoPlayer}
      />
    </Wrapper>
  );
};
export default VideoPlayer;
