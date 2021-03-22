import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Bench from "../components/Bench";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/BackButton";
import CharacterGroup from "../components/CharacterGroup";
import NavigationService from "../services/NavigationService";
import ChapterService from "../services/ChapterService";
import styled from "styled-components";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { characterType } from "../constants";
import posed from "react-pose";
import ContentButton from "../components/ContentButton";
const Characters = posed.div({
  offScreenRight: {
    x: "1000px",
    opacity: 0,
    transition: { duration: 1000 },
  },
  middle: {
    x: 0,
    opacity: 1,
    transition: { duration: 1000 },
  },
  offScreenLeft: {
    x: "-1000px",
    opacity: 0,
    transition: { duration: 1000 },
  },
});
const Wrapper = styled.div`
  height: 100%;
  

  .student-inner{
    font-size: 2.5rem !important;
    padding-left: 50px !important;
    padding-top: 40px !important;
    color: black !important;
  }
  .teachers-inner{
    font-size: 2.5rem !important;
    padding-left: 100px !important;
    padding-top: 40px !important;
    color: black !important;
  }
  .portal-button {
    position: absolute;
    bottom: 45%;
    img {
      height: 100px;
      width: auto;
      @media screen and (min-width: 1200px) and (max-width: 1600px) {
        height: 75px;
        width: auto;
      }
      @media (min-width: 768px) and (max-width: 1024px) {
        height: 50px;
        width: auto;
      }
    }
  }
  .students {
    right: 150px;
    background-image: url("../assets/media/images/buttons/Student Portal_Normal.png") !important;
    width:300px;
    background-size: 300px;
  }
  .teachers {
    left: 150px;
    background-image: url("../assets/media/images/buttons/Teachers Portal_Normal.png") !important;
    width:300px;
    background-size: 300px;
  }
`;
const Portal = ({ history }) => {
  const { getCharacters } = ChapterService.useContainer();
  const {
    setShowBack,
    setShowContent,
    setShowHint,
  } = NavigationService.useContainer();
  const [pose, setPose] = useState("middle");
  const characters = getCharacters();
  useEffect(() => {
    setShowContent(true);
    setShowBack(true);
    setShowHint(true);
    localStorage.setItem("playAnimation", true);
  }, [setShowBack]);
  const handleClickStudents = () => history.push("/students");
  const handleClickTeachers = () => {
    setPose("offScreenLeft");
  };
  const handlePoseComplete = (pose) => {
    if (pose === "offScreenLeft") {
      history.push("/teachers");
    }
  };
  let playAnimation = localStorage.getItem("playAnimation");
  return (
    <Wrapper>
      <Background>
        <Characters
          initialPose={playAnimation === "false" ? "offScreenRight" : ""}
          pose={pose}
          onPoseComplete={(p) => handlePoseComplete(p)}
        >
          <CharacterGroup
            characters={_.filter(
              characters,
              (character) => character.type === characterType.STUDENT
            )}
            className="characters"
            charClassName="student"
            alignment="center"
          />
        </Characters>
        <Bench>
          <PrimaryButton
            className={"cusButtonOutter students portal-button"}
            otherClassName={"custButton text-left student-inner"}
            onClick={() => handleClickStudents()}
          >
            Student<br/>Portal
          </PrimaryButton>
          <PrimaryButton
            className={"onBench cusButtonOutter teachers portal-button"}
            otherClassName={"custButton text-right teachers-inner"}
            onClick={() => handleClickTeachers()}
          >
            Teacher<br/> Portal
          </PrimaryButton>
        </Bench>
      </Background>
      <BackButton />
      <ContentButton/>
    </Wrapper>
  );
};
export default withRouter(Portal);
