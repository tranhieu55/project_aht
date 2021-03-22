import React, { useState, useEffect, useCallback } from "react";
import ContentService from "../services/ContentService";
import Character from "../components/Character";
import CharacterGroup from "./CharacterGroup";
import styled from "styled-components";
import _ from "lodash";
import HintButton from "./HintButton";
const Wrapper = styled.div`
`;
export default ({ conversation, skip, onConversationEnd }) => {
  const { getCharacter } = ContentService.useContainer();
  const [index, setIndex] = useState(0);
  const [characters, setCharacters] = useState([]);
  const handleConversation = useCallback(
    i => {
      if (i < conversation.length) {
        let char = getCharacter(conversation[i].character);
        if (conversation[i].actions !== undefined) {
          char.actions = conversation[i].actions;
        }
        if (conversation[i].text !== undefined) {
          char.text = conversation[i].text;
        }
        if (conversation[i].audio !== undefined) {
          char.audio = conversation[i].audio;
        }
        if (
          _.find(characters, character => character.id === char.id) ===
          undefined
        ) {
          setCharacters(characters => characters.concat(char));
        } else {
          let copy = characters;
          let index = _.findIndex(
            characters,
            character => character.id === char.id
          );
          copy[index] = char;
          setCharacters(copy);
        }
      } else {
        if (onConversationEnd !== undefined) {
          onConversationEnd();
        }
      }
    },
    [characters, conversation, getCharacter, onConversationEnd]
  );
  useEffect(() => {
    handleConversation(index);
  }, [handleConversation, index]);
  const handleEnd = () => {
    handleConversation(index + 1);
    setIndex(index => index + 1);
  };
  return (
    <Wrapper>
      <CharacterGroup
        characters={characters}
        onAnimationEnd={() => handleEnd()}
        onTextEnd={handleEnd}
        onAudioEnd={() => handleEnd()}
        alignment="space-between"
        charClassName="teacher"
        skip={skip}
      />
    </Wrapper>
  );
};
