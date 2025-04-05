import { Anthropic } from '@anthropic-ai/sdk';

const API_KEY = process.env.REACT_APP_CLAUDE_API_KEY;

const client = new Anthropic({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function sendMessageToClaude(message: string): Promise<string> {
    try {
        const response = await client.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            messages: [{ role: 'user', content: message }],
            max_tokens: 1024,
        });

        if (response && response.content && response.content.length > 0) {
            const textContent = response.content
                .filter((item: any) => item.type === 'text')
                .map((item: any) => item.text)
                .join(' ');
            return textContent;
        } else {
            throw new Error('Unexpected response structure from Claude API');
        }
    } catch (error: any) {
        console.error('Error calling Claude API:', error.message || error);
        throw new Error('Failed to get response from Claude. Please try again later.');
    }
}
