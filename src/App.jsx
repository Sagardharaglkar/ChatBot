import viteLogo from '/vite.svg'
import { useEffect, useRef } from "react";

import { useState } from 'react'
import './App.css'
import { TbMessageChatbot } from 'react-icons/tb'
import { FaChevronDown } from 'react-icons/fa'
import ChatForm from './components/ChatForm'
import ChatMessage from './components/ChatMessage'

function App() {
  const [chatHistory, setChatHistory] = useState([])
  const chatBodyRef = useRef(null);

  // Scroll to the bottom whenever chatHistory changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);
  const generatBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: "model", text }]);
    }



    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptins = {
      method: "POST",
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify({ contents: history })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptins);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Somthing went wrong !")

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error)
    }

  }


  return (

    <>
      <div className="container w-1/2 lg:w-1/4 m-auto shadow-2xl rounded-b-xl">

        <div className="p-3 chat-header flex bg-purple-600 justify-between rounded-t-xl">
          <div className="header-info flex items-center gap-3">
            <TbMessageChatbot className='p-1 text-3xl rounded-full bg-purple-500 text-white' />
            <h2 className='logo-text'>Chatbot</h2>
          </div>
          <button className=''><FaChevronDown /></button>
        </div>

        <div ref={chatBodyRef} className='chat-body h-[70vh] overflow-y-auto scrollbar-transparent bg-scroll p-4 flex flex-col gap-4'>
          <div className='message bot-message flex items-end gap-3'>
            <TbMessageChatbot className='p-1 text-2xl rounded-full bg-purple-500 text-white' />
            <p className="message-text bg-gray-200 p-2 rounded-t-xl rounded-br-xl">
              Hey there <br />How can I help ou today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

        </div>

        <div className='chat-footer p-2 '>
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generatBotResponse={generatBotResponse} />
        </div>
      </div>
    </>
  )
}

export default App
