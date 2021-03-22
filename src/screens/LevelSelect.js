import React, { useState, useEffect } from "react";
import Background from "../components/Background";
import Bench from "../components/Bench";
import BackButton from "../components/BackButton";
import KooriFlag from "../components/KooriFlag";
import Conversation from "../components/Conversation";
import PrimaryButton from "../components/PrimaryButton";
import ContentService from "../services/ContentService";
import NavigationService from "../services/NavigationService";
import ChapterService from "../services/ChapterService";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";
import posed from "react-pose";
import HintButton from "../components/HintButton";
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .chapters {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      list-style: none;
      padding: 0;
      li {
        padding: 20px;
        button {
          width: 100%;
          padding: 0;
          background-color: transparent;
          border: none;
          img {
            width: 200px;
            height: auto;
          }
        }
      }
    }
  }
  .bench {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ChapterContainer = posed.div({
  open: {
    scaleX: 1,
    scaleY: 1,
    staggerChildren: 100,
    transition: { duration: 1000 }
  },
  closed: {
    scaleX: 0,
    scaleY: 0,
    transition: { duration: 1000 }
  }
});
const Chapter = posed.li({
  open: {
    opacity: 1,
    transition: { duration: 1000 }
  },
  closed: {
    opacity: 0,
    transition: { duration: 1000 }
  }
});
const LevelSelectScreen = ({ history }) => {
  const { content } = ContentService.useContainer();
  const { setShowSkip, setShowBack } = NavigationService.useContainer();
  const { setChapter } = ChapterService.useContainer();
  const [showChapters, setShowChapters] = useState(false);
  useEffect(() => {
    setShowBack(true);
  }, [setShowSkip, setShowBack]);
  const handleConversationEnd = () => {
    setShowChapters(true);
    setShowSkip(false);
  };
  const handleSelectChapter = option => {
    setChapter(option);
    history.push("/portal");
  };
  return (
    <Wrapper>
      <Background>
        <Conversation
          skip={showChapters}
          conversation={content.conversation}
          onConversationEnd={() => handleConversationEnd()}
        />
        <ChapterContainer
          className="chapters"
          pose={showChapters ? "open" : "closed"}
        >
          <ul>
            {content.chapters.map((chapter, index) => {
              return (
                <Chapter key={index}>
                  <Button
                    disabled={!chapter.enabled}
                    onClick={() => handleSelectChapter(chapter)}
                  >
                    <img
                      src={chapter.image.source}
                      alt={chapter.image.alt}
                      className="chapter-button"
                    />
                  </Button>
                </Chapter>
              );
            })}
          </ul>
        </ChapterContainer>
        <HintButton/>
        <Bench className="bench">
          {!showChapters && (
            <PrimaryButton onClick={() => setShowChapters(true)}>
              SKIP INTRODUCTION
            </PrimaryButton>
          )}
        </Bench>
      </Background>
      <BackButton />
      <KooriFlag flagClassName="koori-flag-LevelSelect" />
    </Wrapper>
  );
};
export default withRouter(LevelSelectScreen);
