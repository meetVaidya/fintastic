"use client"

import { useState, useEffect } from 'react'
import Message from './Message'

type MessageType = {
    id: number
    text: string
    sender: 'user' | 'bot'
}

export default function ChatWindow() {
    const [messages, setMessages] = useState<MessageType[]>([
        { id: 1, text: "Hello! I'm your financial assistant. How can I help you today?", sender: 'bot' }
    ])

    useEffect(() => {
        // Scroll to bottom of chat window when new messages are added
        const chatWindow = document.getElementById('chat-window')
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight
        }
    }, [messages])

    return (
        <div id="chat-window" className="h-[400px] overflow-y-auto mb-4">
            {messages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    )
}