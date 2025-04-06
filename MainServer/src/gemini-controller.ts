import axios from 'axios';
import { optionsPrompt } from './prompts';
import dotenv from 'dotenv';

dotenv.config();

const AI_KEY = process.env.AI_KEY;
const AI_MODEL = process.env.AI_MODEL;

const getOptions = async (emotion: string, age: number, speech: string) => {
    const prompt = optionsPrompt();

    const load = {
        contents: [
            // {
            //     role: 'model',
            //     parts: [
                    
            //     ],
            // },
            {
                role: 'user',
                parts: [
                    {
                        text: prompt,
                    },
                    {
                        text: `Emotional state: ${emotion}, Age: ${age}, Conversation: ${JSON.stringify(speech)}`,
                    },
                ],
            },
        ],
    };

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${AI_KEY}`,
            load,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return stripCodeBlock(response.data.candidates[0].content.parts[0].text);
    } catch (err) {
        throw new Error('Gemini broke: ' + err.response.data.error.message);
    }
};

function stripCodeBlock(text) {
    return text
        .replace(/```json\s*/i, '') // Remove ```json (case-insensitive)
        .replace(/```$/, '') // Remove ending ```
        .trim(); // Clean up any extra whitespace
}

export { getOptions };
