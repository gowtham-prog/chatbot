export interface Message {
    id: string
    content: string
    timestamp: string
    sender: "user" | "assistant"
}

export interface ChatState {
    messages: Message[]
    isTyping: boolean
}

