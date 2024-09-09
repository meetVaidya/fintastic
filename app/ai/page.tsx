import ChatInput from "@/components/ChatInput";
import ChatWindow from "@/components/ChatWindow";

export default function Home() {
    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Financial Chatbot</h1>
            <div className="bg-card rounded-lg shadow-lg p-4">
                <ChatWindow />
                <ChatInput />
            </div>
        </div>
    );
}
