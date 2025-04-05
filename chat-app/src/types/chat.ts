export interface Message {
    id: string
    content: string
    timestamp: string
    sender: "user" | "assistant"
    status?: "sending" | "sent" | "error"
}

export interface ChatState {
    messages: Message[]
    isTyping: boolean
    error: string | null
    suggestions: string[]
}

export interface Theme {
    mode: "light" | "dark"
}

export interface Settings {
    speechEnabled: boolean
    notifications: boolean
    theme: Theme["mode"]
}

