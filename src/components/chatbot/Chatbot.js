import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import '../../App.css'
import GptBot from './Gptbot'
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#0f4d4a',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0f4d4a',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

// all available config props
const config = {
  width: '300px',
  height: '400px',
  hideUserAvatar: true,
  placeholder: 'Type your response.',
  headerTitle: 'ChatBot',
}

const Chatbot = (props) => {
  let [showChat, setShowChat] = useState(false)
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKey = () => {
    localStorage.setItem('key', input);
  }

  const startChat = () => {
    setShowChat(true)
  }
  const hideChat = () => {
    setShowChat(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="input-container">
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleKey}>Apply</button>
      </div>
      <div style={{ display: showChat ? 'none' : '' }}>
        <GptBot />
      </div>
      <div>
        {!showChat ? (
          <button className="btn" onClick={() => startChat()}>
            <i className="fa fa-minus"></i>
          </button>
        ) : (
          <button className="btn" onClick={() => hideChat()}>
            <i className="fa fa-plus"></i>
          </button>
        )}
      </div>
    </ThemeProvider>
  )
}

export default Chatbot
