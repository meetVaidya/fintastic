import { cn } from "@/lib/utils"

type MessageProps = {
    message: {
        text: string
        sender: 'user' | 'bot'
    }
}

export default function Message({ message }: MessageProps) {
    return (
        <div
            className={cn(
                "mb-4 flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "rounded-lg p-2 max-w-[80%]",
                    message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                )}
            >
                {message.text}
            </div>
        </div>
    )
}