import React, { useState } from "react";
import axios from "axios";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const GptBot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [reqConversation, setReqConversation] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const apiKey = localStorage.getItem('key')

  const handleChat = async () => {
    if (isSending) return;
    setIsSending(true);
    setReqConversation([
      ...conversation,
      { role: "user", content: input },
    ]);
    try {
      const response = await axios.post(
        "https://openai.1rmb.tk/v1/chat/completions",
        {
          model:"gpt-3.5-turbo",
          messages: reqConversation,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      const botRes = response.data.choices[0].message.content;
      if (botRes != '' && botRes != null) {
        setConversation([
          ...conversation,
          { role: "user", content: input },
          { role: "assistant", content: botRes },
        ]);
      }
      const conversationDiv = document.getElementById("conversation");
      if (conversationDiv) {
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
      }
    } catch (error) {
      console.log(error);
    }finally {
      setInput("");
      setIsSending(false);
    }
  };

  return (
    <div>
      <div id="conversation" className="conversation" >
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
        <button onClick={handleChat}> {isSending ? "Sending..." : "Send"}</button>
      </div>
    </div>
  );
};

export default GptBot;