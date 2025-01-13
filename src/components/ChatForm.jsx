import React from 'react'
import { useState, useRef } from 'react'
import { LuSend } from 'react-icons/lu'

const ChatForm = ({ chatHistory, setChatHistory, generatBotResponse }) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef();
    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";
        console.log(userMessage)
        setChatHistory((history) => [...history, { role: "user", text: userMessage }])

        setTimeout(() => {
            setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }])
            generatBotResponse([...chatHistory, { role: "user", text: userMessage }])
        }, 600);
        setMessage("")


    }
    const clearMessage = () => {
        setMessage("");
    }
    return (
        <form action="#" onSubmit={handleFormSubmit} className=' h-10 chat-form flex items-center w-full justify-between p-1 px-2 pl-3 border border-gray-400 rounded-full gap-3'>
            <input ref={inputRef} type="text" placeholder='Message..' className='focus:outline-none focus:ring-0 message-input border-none h-full w-full' required value={message} onChange={handleInputChange} />
            {message.trim() && <button className='bg-purple-500 p-2 rounded-full'><LuSend /></button>}
        </form>
    )
}

export default ChatForm
