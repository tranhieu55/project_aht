import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";
import SpeechBubble from "./SpeechBubble";
import ContentService from "../services/ContentService";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { hintDelay } from "../constants";
import _ from "lodash";
const Wrapper = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  pointer-events: all;
  img {
    width: 100px;
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
  .highlight {
    animation: border-flicker 2s linear infinite;
  }
  @keyframes border-flicker {
    0% {
      box-shadow: 0px 0px 10px 5px rgba(240, 255, 0, 0);
    }
    20% {
      box-shadow: 0px 0px 10px 5px rgba(240, 255, 0, 0.5);
    }
    40% {
      box-shadow: 0px 0px 10px 5px rgba(240, 255, 0, 1);
    }
    60% {
      box-shadow: 0px 0px 10px 5px rgba(240, 255, 0, 1);
    }
    80% {
      box-shadow: 0px 0px 10px 5px rgba(240, 255, 0, 0.5);
    }
    100% {
      box-shadow: 0px 0px 10px 5px rgba(240, 255, 0, 0);
    }
  }
`;
const HintButton = ({ history }) => {
  const { content } = ContentService.useContainer();
  const hints = content.hints;
  const [showHelp, setShowHelp] = useState(false);
  const [path, setPath] = useState(history.location.pathname);
  const [hint, setHint] = useState(null);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (hint != null) {
      console.log(hint.showHelp);
      if (hint.showHelp == "true") {
        setShowHelp(true);
      }
    }

  }, [hint])
  useEffect(() => {
    setShowHelp(false);

    setHint(_.find(hints, (h) => h.path === history.location.pathname));
    if (history.location.pathname !== path) {
      setTimer(0);
      setPath(history.location.pathname);
    }
  }, [history.location.pathname]);
  useEffect(() => {
    
    const interval = setInterval(() => {
      if (timer < hintDelay && !showHelp) {
        setTimer((timer) => timer + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer, showHelp]);
  const handleClick = () => {
    setShowHelp(!showHelp);
    setTimer(0);
  };

  if (hint === undefined) {
    return null;
  }

  return (
    <Wrapper>
      <IconButton
        className={timer >= hintDelay ? "highlight" : ""}
        onClick={() => handleClick()}
      >
        <img src="images/icons/help.png" alt="help" />
        {showHelp && (
          <SpeechBubble
            className={`left-speech-bubble`}
            alignment="left"
            text={hint.text}
          />
        )}
      </IconButton>
    </Wrapper>
  );
};
export default withRouter(HintButton);
