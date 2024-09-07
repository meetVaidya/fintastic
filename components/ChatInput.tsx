"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon } from 'lucide-react'

export default function ChatInput() {
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim()) {
            // Here you would typically send the message to your chatbot backend
            console.log('Sending message:', input)
            setInput('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow"
            />
            <Button type="submit">
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </form>
    )
}