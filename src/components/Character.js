import React, { useState, useEffect, useCallback, useRef } from "react";
import SpeechBubble from "./SpeechBubble";
import CharacterPopup from "./CharacterPopup";
import ChapterService from "../services/ChapterService";
import styled from "styled-components";
import posed from "react-pose";
const Character = posed.div({
  center: {
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    opacity: 1,
    transition: { duration: 1000 },
  },
  offscreenLeft: {
    top: "50%",
    left: "0%",
    x: "-50%",
    y: "0",
    opacity: 0,
    transition: { duration: 1000 },
  },
  left: {
    top: "52%",
    left: "25%",
    x: "-50%",
    y: "0",
    opacity: 1,
    transition: { duration: 1000 },
  },
  offscreenRight: {
    top: "50%",
    left: "100%",
    x: "-50%",
    y: "0",
    opacity: 0,
    transition: { duration: 1000 },
  },
  right: {
    top: "52%",
    left: "75%",
    x: "-50%",
    y: "0",
    opacity: 1,
    transition: { duration: 1000 },
  },
});
const StyledCharacter = styled(Character)`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 550px;
  height: 750px;
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 650px;
    width: 550px;
  }
  .character-container {
    position: absolute;
    display: contents;
    justify-content: center;
    img {
      height: 38vh;
      position: absolute;
      bottom: 0;
      pointer-events: ${(props) => props.pointerEvent};
      cursor: ${(props) => props.cursorType};
      @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
        bottom: auto;
      }
    }
    .grow {
      transition: all 0.2s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }

    .left-speech-bubble {
      position: absolute;
      top: 10%;
      left: 80%;
      width: 500px;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 300px;
      }
    }
    .right-speech-bubble {
      position: absolute;
      top: 10%;
      right: 80%;
      width: 500px;
      @media (min-width: 768px) and (max-width: 1024px) {
        width: 300px;
      }
    }
  }
`;
export default ({
  character,
  actions,
  text,
  onTextEnd,
  audio,
  onAudioEnd,
  onAnimationEnd,
  className,
  interactable,
  hoverable,
}) => {
  const char = useRef(null);
  const { getCharacters, getTools } = ChapterService.useContainer();
  const [alignment, setAlignment] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [index, setIndex] = useState(0);
  const [filteredToolList,setfilteredToolList] = useState(new Array());
  const handleNextAction = useCallback(() => {
    if (actions && actions.length > 0) {
      if (index < actions.length) {
        setIndex((index) => index + 1);
      }
    }
  }, [actions, index]);
  useEffect(() => {
    handleNextAction();
    if (char.current !== null) {
      if (
        char.current.getBoundingClientRect().x >=
        document.documentElement.clientWidth / 2
      ) {
        setAlignment("right");
      } else {
        setAlignment("left");
      }
    }
  }, [handleNextAction, char]);
  const handleOnPoseComplete = (pose) => {
    if (pose === undefined) {
      return;
    }
    handleNextAction();
    if (actions && index === actions.length - 1) {
      if (onAnimationEnd !== undefined) {
        onAnimationEnd();
      }
    }
  };
  const handleClick = () => {
    const toolList = getTools();
    const characterTools = character.questions[2].tools;
    let filteredTool = new Array();


    characterTools.map((tool) => {
      toolList
        .filter((tools) => tools.id == tool)
        .map((filteredTools) => filteredTool.push(filteredTools));
    });
    setfilteredToolList({filteredTool})
    filteredTool=new Array()
    
    if (interactable) {
      setShowPopup(true);
    }
  };
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <StyledCharacter
      pose={actions && actions.length > 0 ? actions[index] : ""}
      onPoseComplete={(pose) => handleOnPoseComplete(pose)}
      className={className}
      pointerEvent={interactable ? "all" : "none"}
      cursorType={interactable ? "pointer" : "default"}
    >
      <div className="character-container">
        <img
          src={character.image.source}
          alt={character.image.alt}
          ref={char}
          onClick={() => handleClick()}
          className={hoverable ? "grow" : ""}
        />
        <SpeechBubble
          className={`${alignment}-speech-bubble`}
          alignment={alignment}
          text={text}
          audio={audio}
          onAudioEnd={() => onAudioEnd()}
          onTextEnd={() => onTextEnd()}
        />
        <CharacterPopup
          character={character}
          show={showPopup}
          onClose={() => handleClose()}
          filteredTool={filteredToolList}
        />
      </div>
    </StyledCharacter>
  );
};
