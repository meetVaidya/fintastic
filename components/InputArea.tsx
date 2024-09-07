"use client";

import React, { useState } from "react";

interface InputAreaProps {
    onSendMessage: (message: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (message.trim() !== "") {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-4 py-4">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default InputArea;