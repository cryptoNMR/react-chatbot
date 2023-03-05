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
    setConversation([
      ...conversation,
      { role: "user", content: input },
    ]);
    try {
      const response = await axios.post(
        "https://openai.1rmb.tk/v1/chat/completions",
        {
          model:"gpt-3.5-turbo",
          messages: conversation,
          temperature: 0.5,
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
        { role: "assistant", content: botResponse },
      ]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="conversation" >
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role === "user" && (
              <div className="user-message">
                <img src="/images/user.png" alt="User Avatar" sizes="100" />
                <p>{message.content}</p>
              </div>
            )}
            {message.role === "assistant" && (
              <div className="bot-message">
                <img src="/images/logo.png" alt="Chatbot Avatar" sizes="100" />
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