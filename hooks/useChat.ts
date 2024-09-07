import { useState, useEffect } from "react";

interface ChatMessage {
    type: "user" | "bot";
    content: string;
}

export const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle sending a new message
    const sendMessage = (message: string) => {
        setMessages([...messages, { type: "user", content: message }]);
        setIsLoading(true);

        // ... (Call your chatbot API here to get a response)
        // Example using a fake delay:
        setTimeout(() => {
            setMessages([
                ...messages,
                { type: "bot", content: "This is a sample response from the chatbot." },
            ]);
            setIsLoading(false);
        }, 1500);
    };

    // ... (Additional chat logic if needed)

    return { messages, isLoading, sendMessage };
};