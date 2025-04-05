import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { ChatState, Message } from "../types/chat"
import { sendMessageToClaude } from '../services/claudeApi';

const initialState: ChatState = {
    messages: [],
    isTyping: false,
    error: null,
    suggestions: ["Tell me about hooks", "Performance tips", "State management"],
}

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (message: string) => {
        const response = await sendMessageToClaude(message);
        console.log("response here",response)
        return response;
    }
);

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },
        setTyping: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload
        },
        setSuggestions: (state, action: PayloadAction<string[]>) => {
            state.suggestions = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isTyping = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isTyping = false;
                state.messages.push({
                    id: Date.now().toString(),
                    content: action.payload,
                    timestamp: new Date().toISOString(),
                    sender: 'assistant',
                });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isTyping = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
})

export const { addMessage, setTyping, setSuggestions, clearError } = chatSlice.actions

export default chatSlice.reducer;