import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Bench from "../components/Bench";
import BackButton from "../components/BackButton";
import ContentButton from "../components/ContentButton";
import ContentPopup from "../components/ContentPopup";
import CharacterGroup from "../components/CharacterGroup";
import PrimaryButton from "../components/PrimaryButton";
import ChapterService from "../services/ChapterService";
import NavigationService from "../services/NavigationService";
import styled from "styled-components";
import { characterType } from "../constants";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import posed from "react-pose";
const Wrapper = styled.div`
  height: 100%;
  widtg: fit-content;
  .outbox{
    width:100%;
    height:100%;
  }
  .left{
    left: 10%;
  }
  .right{
    right: 10%;
  }
  .inbox{
    text-align: center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .group {
    display: inline-block;
    position: absolute;
    width: auto;
}
  }
  .character {
    position: relative;
  }
  .button-list {
    padding-top: 20%;
    display: inline-block;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    ul {
      list-style:none;
        li {
          padding: 20px;
          button{
            width:100%;
          }
        }
      }
    }
  }
`;
const Characters = posed.div({
  offScreenRight: {
    x: "1000px",
    opacity: 0,
    transition: { duration: 1000 },
  },
  exitRight: {
    x: "1000px",
    opacity: 0,
    transition: { duration: 1000 },
  },
  right: {
    x: "450px",
    opacity: 1,
    transition: { duration: 1000 },
  },
  left: {
    x: "-500px",
    opacity: 1,
    transition: { duration: 1000 },
  },
  offScreenLeft: {
    x: "-1000px",
    opacity: 0,
    transition: { duration: 1000 },
  },
  exitLeft: {
    x: "-1000px",
    opacity: 0,
    transition: { duration: 1000 },
  },
});
const TeachersPortal = ({ history }) => {
  const { chapter, getCharacters } = ChapterService.useContainer();
  const {
    setShowBack,
    setBackCallback,
    setGoBack,
    setShowContent,
  } = NavigationService.useContainer();
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [exitPose, setExitPose] = useState(false);
  const [show, setShow] = useState(false);
  const sortCharacters = (chars) => {
    chars.map((c, index) => {
      if (c.type === characterType.TEACHER) {
        if (index % 2 === 0) {
          setLeft((left) => left.concat(c));
        } else {
          setRight((right) => right.concat(c));
        }
      }
    });
  };

  setBackCallback(function () {
    setExitPose(true);
    setGoBack(true);
  });
  useEffect(() => {
    setShowBack(true);
    setGoBack(false);
    setShowContent(true);
    sortCharacters(getCharacters());
    localStorage.setItem("playAnimation", false);
  }, [setShowBack]);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Wrapper>
      <Background>
        <div className="outbox">
          <div className="inbox">
            <CharacterGroup
              characters={left}
              charClassName="teacher character"
              className="group left"
              alignment="flex-start"
            />
            <div className="button-list">
              <ul>
                <li>
                  <PrimaryButton
                    onClick={() => window.open(chapter.teacher_notes, "_blank")}
                  >
                    DOWNLOAD STUDENT NOTE'S
                  </PrimaryButton>
                </li>
                <li>
                  <PrimaryButton
                    onClick={() => window.open(chapter.student_notes, "_blank")}
                  >
                    DOWNLOAD STUDENT NOTE'S
                  </PrimaryButton>
                </li>
                <li>
                  <PrimaryButton onClick={() => setShow(true)}>
                    ANIMATIONS
                  </PrimaryButton>
                </li>
              </ul>
            </div>
            <CharacterGroup
              characters={right}
              charClassName="teacher character"
              className="group right"
              alignment="flex-end"
            />
          </div>
        </div>
        <Bench />
      </Background>
      <BackButton />
      <ContentButton />
      <ContentPopup show={show} onClose={handleClose} />
    </Wrapper>
  );
};
export default withRouter(TeachersPortal);
