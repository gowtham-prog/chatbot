"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, Send } from "lucide-react"

interface ChatInputProps {
    onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
    const [message, setMessage] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const speechRecognition = new window.webkitSpeechRecognition()
            speechRecognition.continuous = false
            speechRecognition.interimResults = false
            speechRecognition.lang = "en-US"

            speechRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setMessage(transcript)
            }

            speechRecognition.onend = () => setIsRecording(false)

            setRecognition(speechRecognition)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            onSend(message)
            setMessage("")
        }
    }

    const handleVoiceInput = () => {
        if (!recognition) return

        if (isRecording) {
            recognition.stop()
        } else {
            setIsRecording(true)
            recognition.start()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceInput}
                className={isRecording ? "text-red-500" : ""}
            >
                <Mic className="h-5 w-5" />
            </Button>
            <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-5 w-5" />
            </Button>
        </form>
    )
}
