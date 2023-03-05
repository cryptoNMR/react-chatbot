import React, { useState } from "react";
import axios from "axios";

const GptBot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const apiKey = localStorage.getItem('key');

  const handleChat = async () => {
    try {
      const response = await axios.post(
        "https://openai.1rmb.tk/v1/chat/completions",
        {
          model: 'gpt-3.5-turbo',
          input,
          temperature: 0.6,
          stream: true,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data.choices[0].text;
      setConversation([...conversation, { user: input, bot: botResponse }]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="conversation">
        {conversation.map((message, index) => (
          <div key={index}>
            <div className="user-message">
              <img src="user-avatar.png" alt="User Avatar" />
              <p>{message.user}</p>
            </div>
            <div className="bot-message">
              <img src="chatbot-avatar.png" alt="Chatbot Avatar" />
              <p>{message.bot}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleChat}>Send</button>
      </div>
    </div>
  );
};

export default GptBot;