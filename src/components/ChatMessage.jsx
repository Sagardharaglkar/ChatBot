import React from 'react'
import { TbMessageChatbot } from 'react-icons/tb'

const ChatMessage = ({ chat }) => {
    return (
        <div className=''>
            {chat.role === "model" ? <div className='message bot-message flex items-end gap-3'>
                <TbMessageChatbot className='p-1 text-2xl rounded-full bg-purple-500 text-white' />
                <p className="message-text w-3/4 bg-gray-200 p-2 rounded-t-xl rounded-br-xl">
                    {chat.text}
                </p>
            </div> : <div className="message user-message w-full flex justify-end ">
                {/* {chat.role === "model" && <TbMessageChatbot className='p-1 text-2xl rounded-full bg-purple-500 text-white'/>} */}
                <p className="message-text p-2 w-3/4 bg-purple-300 rounded-t-xl rounded-bl-xl">
                    {chat.text}
                </p>
            </div>}
        </div>
    )
}

export default ChatMessage    
