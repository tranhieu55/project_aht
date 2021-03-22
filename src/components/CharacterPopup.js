import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ChapterService from "../services/ChapterService";
import ReactPlayer from "react-player";
import AudioService from "../services/AudioService";
import styled from "styled-components";
import ToolGroup from '../components/ToolGroup';
import { useHistory } from 'react-router-dom';

import _, { filter } from 'lodash'
const Wrapper = styled(Modal)`
  .other-title{
    color:#676767;
  }
  .tools{
    width: 50%;
    height: 0;
  }
  .popup-name{
    padding-left:60px
  }
  .modal-dialog {
    max-width: 80%;
    width: 100%;
    height: 100%
    margin: 0 auto;
    .modal-content {
      border: none;
      width: 100%;
      height: 100%
      margin: 0 auto;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: auto;
      .portrait {
        width: 134px;
        height: auto;
      }
      .accordion-item{
        display:flex;
        margin-top:20px;
      }
      .accordion-title {
        background-size: cover;
        display: flex;
        align-items: center;
        width: 25%;
        height: 65px;
        font-size: 16px;
        color:#000000;
        padding-right: 50px;
      }
      .accordion-content{
        width: 63%;
        position: absolute;
        left: 250px;
        top: 200px;
        // overflow: auto;
        height: 40%;
        font-size:20px;
      }
      .bold-content{
        position: absolute;
        font-weight:bold;
        width: 63%;
        font-size:16px;
        bottom: 100px;
        left: 250px;
      }
      .character-footer {
        position: absolute;
        bottom: 0px;
        left: 35%;
        display: flex;
        justify-content: center;
        .button {
          width: 200px;
          margin: 10px;
        }
      }
    }
  }
`;

export default ({ character, show, onClose, filteredTool }) => {
  const { getCharacters, getTools, team, setInventoryTools, inventoryTools } = ChapterService.useContainer()
  const { mute, volume } = AudioService.useContainer();
  const { setTeam } = ChapterService.useContainer();
  const [activeIndex, setActiveIndex] = useState(0);
  const history = useHistory();

  const handleClick = (index) => {
    
    setActiveIndex(index);
    if (index === activeIndex) setActiveIndex(null);
  };
  const [] = useState(0);
  const toolList = getTools();

  const handleAdd = (tool) => {
    setInventoryTools([...inventoryTools, tool])
  }
  const handleRemove = (tool) => {
    setInventoryTools(inventoryTools.filter(function (value, index, arr) {
      return value.id !== tool.id
    }))
  }
  const handleUse = (link) => {
    window.open(link, '_blank')
  }
  const handleVideo = (target)=>{
    window.open(target,'_blank')
  }
  const handleJoin = () => {
    localStorage.setItem("character",JSON.stringify(character))
    setTeam(character.id);

    if (character.id == "ardash"){
      history.push("/ardash")
    }
    else if (character.id == 'cornelia'){
      history.push("/cornelia")
    }
    else if (character.id == 'vivi'){
      history.push("/vivi")
    }
    onClose();
  };
  console.log("-----------"+JSON.stringify(filteredTool.filteredTool))

  return (
    <Wrapper show={show} onHide={() => onClose()}>
      <div
        className="card character-popup"
        style={{ backgroundImage: `url(${character.image.background})` }}
      >
        <ReactPlayer
          url={character.audio}
          volume={volume}
          muted={mute}
          height="0"
          playing
        />
        <button
          className="close-button"
          aria-label="Close alert"
          type="button"
          data-close
          onClick={() => onClose()}
        >
          <img src="images/icons/close.png" className="closebutton" />
        </button>
        <div className="character-name">
          {character.portrait && (
            <img
              src={character.portrait.source}
              alt={character.portrait.alt}
              className="portrait"
            />
          )}
          <div className="popup-name">
            <h2>{character.name}</h2>
            <br />
            <h4 className="subheader">
              <q style={{ fontSize: 30 }}>{character.quote}</q>
            </h4>
          </div>
        </div>

        <ul
          className="accordion character-question"
          data-accordion
          data-allow-all-closed="false"
        >
          {character.questions &&
            character.questions.map((question, index) => {
              return (
                <li className="accordion-item" data-accordion-item key={index}>
                  <a
                    className="accordion-title other-title"
                    onClick={() => handleClick(index)}
                    style={
                      index !== null && index === activeIndex
                        ? { backgroundImage: `url(${character.image.selected})` }
                        : { backgroundImage: "none" }
                    }
                  >
                    {question.text}
                  </a>
                  <p
                    className="accordion-content"
                    data-tab-content
                    style={
                      index !== null && index === activeIndex
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {question.answer}
                  </p>
                  
                  <p
                    className="bold-content"
                    data-tab-content
                    style={
                      index !== null && index === activeIndex && activeIndex == 0
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {question.bold}
                  </p>
                  <div
                    style={
                      index !== null && index === activeIndex && activeIndex == 2
                        ? { display: "block" }
                        : { display: "none" }
                    }>
                    <ToolGroup
                      tools={filteredTool.filteredTool}
                      alignment='center'
                      justify='center'
                      className='tools'
                      interactable='true'
                      onAdd={handleAdd}
                      onRemove={handleRemove}
                      onUse={handleUse}
                      inventory={inventoryTools}
                    />
                  </div>

                  <p
                    className="bold-content"
                    data-tab-content
                    style={
                      index !== null && index === activeIndex && activeIndex == 2
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {question.bold2}
                  </p>

                  <button width="320" height="240"
                    className="accordion-content"
                    data-tab-content
                    onClick={()=>handleVideo(question.video)}
                    style={
                      index !== null && index === activeIndex && activeIndex == 3
                        ? { display: "block", backgroundImage: `url(${question.videoImg})`,backgroundSize: '70%', backgroundRepeat: 'no-repeat',marginLeft:'12%', marginTop:'8%' }
                        : { display: "none" }
                    }
                  >
                  </button>
                  <button
                    className="hollow button primary"
                    onClick={() => {handleJoin()}}
                    style={
                      index !== null && index === activeIndex && activeIndex == 3
                        ? { display: "block", textAlign:'center', margin:'auto', marginTop:'7%' }
                        : { display: "none" }
                    }
                  >
                    INVESTIGATE WITH ME
                  </button>
                </li>
              );
            })}
        </ul>
        {character.team && (
          <div className="character-footer">
            {/* <button
              className="hollow button primary"
              onClick={() => handleJoin()}
            >
              JOIN TEAM
            </button>
            <button className="hollow button primary" onClick={() => onClose()}>
              MAYBE LATER
            </button> */}
          </div>
        )}
      </div>
    </Wrapper>
  );
};