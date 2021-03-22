import { createContainer } from "unstated-next"
import { useState } from "react"
function useAudioService() {
  const [muteBackground, setMuteBackground] = useState(false)
  const [mute, setMute] = useState(true)
  const [volume, setVolume] = useState(1)
  return { muteBackground, setMuteBackground , volume, setVolume, mute, setMute }
}
let AudioService = createContainer(useAudioService)
export default AudioService
