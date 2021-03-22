import React, { useEffect, useState } from 'react';
import GlobalStyle from './style/GlobalStyle'
import Introduction from './screens/Introduction'
import LevelSelect from './screens/LevelSelect'
import Portal from './screens/Portal'
import TeachersPortal from './screens/TeachersPortal'
import Animation from './screens/Animation'
import StudentsPortal from './screens/StudentsPortal'
import Workbench from './screens/Workbench'
import Ardash from './screens/Ardash'
import Cornelia from './screens/Cornelia'
import Vivi from './screens/Vivi'
import ContentService from './services/ContentService'
import AudioService from './services/AudioService'
import NavigationService from './services/NavigationService'
import ChapterService from './services/ChapterService'
import BackgroundAudio from './components/BackgroundAudio'
import HintButton from './components/HintButton'
import MuteButton from './components/MuteButton'
import { BrowserRouter as Router, Route } from "react-router-dom";

const filePath = './assets/json/content.json'
function App() { 
  const [content, setContent] = useState(null)
  useEffect(() => {
    fetch(filePath.replace(".", "")).then((file) => {
      file.json().then((json) => {
        setContent(json)
      }).catch(() => { console.log("ab")})
    })
  }, [])
  if (content === null) return null
 
  return (
    <div className="app">
      <GlobalStyle/>
      <ContentService.Provider initialState={{content}}>
        <NavigationService.Provider>
          <ChapterService.Provider>
            <AudioService.Provider>
              <Router>
                <Route path='/' exact component={Introduction}/>
                <Route path='/level-select' exact component={LevelSelect}/>
                <Route path='/portal' exact component={Portal}/>
                <Route path='/teachers' exact component={TeachersPortal}/>
                <Route path='/students' exact component={StudentsPortal}/>
                <Route path='/workbench' exact component={Workbench}/>
                <Route path='/ardash' exact component={Ardash}/>
                <Route path='/cornelia' exact component={Cornelia}/>
                <Route path='/vivi' exact component={Vivi}/>
                <Route path='/animation/:animationId/'  component={Animation}/>

                <MuteButton/>
                <BackgroundAudio/>
                <HintButton/>
              </Router>
            </AudioService.Provider>
          </ChapterService.Provider>
        </NavigationService.Provider>
      </ContentService.Provider>
    </div>
  );
}
export default App;
