import React, { useEffect } from 'react'
import CharacterGroup from '../components/CharacterGroup'
import PrimaryButton from '../components/PrimaryButton'
import BackButton from '../components/BackButton'
import ContentButton from '../components/ContentButton'
import ChapterService from '../services/ChapterService'
import NavigationService from '../services/NavigationService'
import Background from '../components/Background'
import Bench from '../components/Bench'
import styled from 'styled-components'
import _ from 'lodash'
import { characterType } from '../constants'
import { withRouter } from 'react-router-dom';
const Wrapper = styled.div`
  height: 100%;
  .student {
    position: relative;
    height: 650px;
    width: 450px;
    @media (min-width: 768px) and (max-width: 1024px) {
      height: 550px;
      width: 450px;
    }
  }
  .bench {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const StudentsPortal = ({ history }) => {
  const { chapter, getCharacters, team, setTeam } = ChapterService.useContainer()
  const { setShowBack, setShowContent } = NavigationService.useContainer()
  const characters = getCharacters()
  useEffect(() => {
    setShowBack(true)
    setShowContent(true)
    setTeam(null)
  }, [setShowBack])
  return (
    <Wrapper>
      <Background>
        <CharacterGroup
          characters={_.filter(characters, character => character.type === characterType.STUDENT)}
          charClassName='student'
          className="characters"
          alignment='center'
          interactable='true'
          hoverable='true'
        />
        <Bench className='bench'>
        {
          <PrimaryButton className={"onBench cusButtonOutter"} otherClassName ={"custButton"} onClick={() => {history.push('/workbench')}}>
            WHAT'S ON THE BENCH?
          </PrimaryButton>
        }
        </Bench>
      </Background>
      <BackButton/>
      <ContentButton/>
    </Wrapper>
  )
}
export default withRouter(StudentsPortal)
