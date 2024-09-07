import React from "react";

const ChatActions: React.FC = () => {
    return (
        <div className="flex items-center justify-end mt-4">
            <button className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400">
                {/* Add chat action buttons here (e.g., "Clear Chat", "Send File") */}
            </button>
        </div>
    );
};

export default ChatActions;