import { useState } from "react"
import { createContainer } from "unstated-next"
import _ from "lodash"
function useContentService(initContent) {
  const { content } = initContent

  const getCharacter = (id) => {
    if(!content) return null
    let char = _.find(content.characters, character => character.id === id) || null
    return _.clone(char)
  }
  const getTool = (id) => {
    if(!content) return null
    let tool = _.find(content.tools, tool => tool.id === id) || null
    return _.clone(tool)
  }
  return { content, getCharacter, getTool }
}
let ContentService = createContainer(useContentService)
export default ContentService
