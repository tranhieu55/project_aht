import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Bench from '../components/Bench'
import ToolGroup from '../components/ToolGroup'
import CharacterGroup from '../components/CharacterGroup'
import Inventory from '../components/Inventory'
import ContentButton from '../components/ContentButton'
import ChapterService from '../services/ChapterService'
import NavigationService from '../services/NavigationService'
import BackButton from '../components/BackButton'
import styled from 'styled-components'
import { characterType } from '../constants'
import _ from 'lodash'
const Wrapper = styled.div`
  .student {
    position: relative;
    height: 650px;
    width: 450px;
    @media (min-width: 768px) and (max-width: 1024px) {
      height: 550px;
      width: 450px;
    }
  }
  .tools {
    position: absolute;
    bottom: 100px;
    width: 100%;
  }
  .tools li{
    padding: 20px;
  }
`
export default () => {
  const { getCharacters, getTools, team, setInventoryTools, inventoryTools } = ChapterService.useContainer()
  const { setShowBack } = NavigationService.useContainer()
  const characters = getCharacters()
  useEffect(() => {
    setShowBack(true)
  }, [setShowBack])
  const handleAdd = (tool) => {
    setInventoryTools([...inventoryTools, tool])
  }
  const handleRemove = (tool) => {
    setInventoryTools(inventoryTools.filter(function(value, index, arr){
      return value.id !== tool.id
    }))
  }
  const handleUse = (link) => {
    window.open(link, '_blank')
  }
  return (
    <Wrapper>
      <Background>
        {/* <Inventory
          tools={inventoryTools}
          onAdd={handleAdd}
          onRemove={handleRemove}
          onUse={handleUse}
        /> */}
        <CharacterGroup
          characters={_.filter(characters, character => character.type === characterType.STUDENT)}
          className='characters'
          charClassName='student'
          alignment='center'
        />
        <Bench>
          <ToolGroup
            tools={getTools()}
            alignment='center'
            justify='center'
            className='tools'
            interactable='true'
            onAdd={handleAdd}
            onRemove={handleRemove}
            onUse={handleUse}
            inventory={inventoryTools}
          />
        </Bench>
      </Background>
      <BackButton/>
      <ContentButton/>
    </Wrapper>
  )
}
