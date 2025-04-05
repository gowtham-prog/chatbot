"use client"

import { useState, useEffect, useCallback } from "react"

interface SpeechRecognitionHook {
    isListening: boolean
    transcript: string
    startListening: () => void
    stopListening: () => void
    error: string | null
}

export function useSpeechRecognition(): SpeechRecognitionHook {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [recognition, setRecognition] = useState<any>(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;            
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition()
                recognition.continuous = true
                recognition.interimResults = true
                recognition.lang = "en-US"

                recognition.onresult = (event: any) => {
                    const current = event.resultIndex
                    const transcript = event.results[current][0].transcript
                    setTranscript(transcript)
                }

                recognition.onerror = (event: any) => {
                    setError(event.error)
                }

                setRecognition(recognition)
            } else {
                setError("Speech recognition not supported in this browser")
            }
        }
    }, [])

    const startListening = useCallback(() => {
        if (recognition) {
            recognition.start()
            setIsListening(true)
            setError(null)
        }
    }, [recognition])

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop()
            setIsListening(false)
        }
    }, [recognition])

    return { isListening, transcript, startListening, stopListening, error }
}

