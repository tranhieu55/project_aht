import React, { useEffect, useState } from 'react'
import Character from './Character'
import styled from 'styled-components'
const Wrapper = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  justify-content: center;
  bottom: 12%
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px){
    bottom: -50px;
  }
  .padding{
    padding: 0 1%;
  }
`
export default ({ characters, className, charClassName, interactable, hoverable, alignment, onAnimationEnd, onTextEnd, onAudioEnd, skip }) => {
  return (
    <Wrapper alignment={alignment} className={className}>
    {
      characters.map((character, index) => {
        return (
          <li key={index} className='padding'>
            <Character
              character={character}
              actions={character.actions}
              text={character.text !== undefined && !skip ? character.text : null}
              audio={character.audio !== undefined && !skip  ? character.audio : null}
              className={charClassName}
              onAnimationEnd={onAnimationEnd !== undefined ? () => onAnimationEnd() : null}
              onTextEnd={onTextEnd !== undefined ? () => onTextEnd() : null}
              onAudioEnd={onAudioEnd !== undefined ? () => onAudioEnd() : null}
              interactable={interactable}
              hoverable={hoverable}
            />
          </li>
        )
      })
    }
    </Wrapper>
  )
}
