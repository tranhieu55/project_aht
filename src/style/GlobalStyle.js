import {createGlobalStyle} from 'styled-components'
const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    body {
      height: 100%;
      #root {
        height: 100%;
        .app {
          height: 100%;
          .characters {
            position: absolute;
          }
          .student {
            position: relative;
            height: 650px;
            width: 450px;
            @media screen and (min-width: 1200px) and (max-width: 1600px) {

            }
          }
        }
      .teacher {
        height: 750px;
        width: 550px;
        @media screen and (min-width: 1200px) and (max-width: 1600px) {
          height: 650px;
          width: 450px;
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          height: 550px;
          width: 450px;
        }
      }
    }
  }
`
export default GlobalStyle
