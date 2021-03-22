import { createContainer } from "unstated-next"
import { useState } from "react"
function useNavigationService() {
  const [showBack, setShowBack] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [goBack, setGoBack] = useState(true)
  let backCallback = null
  let hintCallback = null
  let skipCallback = null
  let contentCallback = null
  const handleBack = () => {
    if (backCallback !== null) {
      backCallback()
    }
  }
  const handleHint = () => {
    if (hintCallback !== null) {
      hintCallback()
    }
  }
  const handleSkip = () => {
    if (skipCallback !== null) {
      skipCallback()
    }
  }
  const handleContent = () => {
    if (contentCallback !== null) {
      contentCallback()
    }
  }
  const setBackCallback = (callback) => {
    backCallback = callback
  }
  const setHintCallback = (callback) => {
    hintCallback = callback
  }
  const setSkipCallback = (callback) => {
    skipCallback = callback
  }
  const setContentCallback = (callback) => {
    contentCallback = callback
  }
  return {
    showBack,
    setShowBack,
    showHint,
    setShowHint,
    showSkip,
    setShowSkip,
    showContent,
    setShowContent,
    handleBack,
    handleHint,
    handleSkip,
    handleContent,
    backCallback,
    setBackCallback,
    hintCallback,
    setHintCallback,
    skipCallback,
    setSkipCallback,
    contentCallback,
    setContentCallback,
    goBack,
    setGoBack
  }
}
let NavigationService = createContainer(useNavigationService)
export default NavigationService
