let messageTimer = null

const flashMessage = (messageElement, message) => {
  if (messageTimer) {
    clearTimeout(messageTimer)
  }

  messageElement.value = message

  messageTimer = setTimeout(() => {
    messageElement.value = ''
    messageTimer = null
  }, 3000)
}

export default flashMessage
