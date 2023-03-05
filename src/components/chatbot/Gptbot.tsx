import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const GptBot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const apiKey = localStorage.getItem('key')

  const handleChat = async () => {
    try {
      const response = await axios.post(
        "https://openai.1rmb.tk/v1/chat/completions",
        {
          model:"gpt-3.5-turbo",
          messages: conversation,
          temperature: 0.5,
          stream:true
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data.choices[0].message.content;
      setConversation([
        ...conversation,
        { role: "user", content: input },
        { role: "assistant", content: botResponse },
      ]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="conversation" style={{backgroundColor:'#FFFFFF', height:'100px', width:'100px'}}>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role === "user" && (
              <div className="user-message">
                <img src="user-avatar.png" alt="User Avatar" />
                <p>{message.content}</p>
              </div>
            )}
            {message.role === "assistant" && (
              <div className="bot-message">
                <img src="chatbot-avatar.png" alt="Chatbot Avatar" />
                <p>{message.content}</p>
              </div>
            )}
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