import ContentService from "./ContentService";
import { useState } from "react";
import { createContainer } from "unstated-next";
import _ from "lodash";
function useChapterService() {
  const [chapter, setChapter] = useState(
    JSON.parse(localStorage.getItem("chapter")) || null
  );

  const [team, setTeam] = useState(
    JSON.parse(localStorage.getItem("team")) || null
  );
  const [inventoryTools, setInventoryTools] = useState([]);
  const { getCharacter, getTool } = ContentService.useContainer();
  window.onunload = function() {
    localStorage.setItem("chapter", JSON.stringify(chapter));
  };
  const getCharacters = () => {
    if (!chapter) return null;
    var characters = [];
    _.map(chapter.characters, character => {
      characters.push(getCharacter(character));
    });
    return characters;
  };
  const getTools = () => {
    if (!chapter) return null;
    var tools = [];
    _.map(chapter.tools, tool => {
      tools.push(getTool(tool));
    });
    return tools;
  };
  return {
    chapter,
    setChapter,
    getCharacters,
    getTools,
    team,
    setTeam,
    inventoryTools,
    setInventoryTools
  };
}
let ChapterService = createContainer(useChapterService);
export default ChapterService;
