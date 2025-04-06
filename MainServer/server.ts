import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { getOptions } from './src/gemini-controller';
dotenv.config();

const EMOTION_SERVER_URL = process.env.EMOTION_SERVER_URL;

if (!EMOTION_SERVER_URL || EMOTION_SERVER_URL.length == 0) {
    throw new Error('EMOTION_SERVER_URL IS MISSING');
}

const app = express();

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})

app.use(json());
let contextWindow: string[] = [];
//Get next dialogue options based on opponent's emotions and recent talk
app.post('/dialogue', async (req, res, next) => {
    const speech: string = req.body['text'];
    console.log(speech);

    if (!speech || typeof(speech) != 'string' || speech.length == 0) {
        console.error('speech is required');
        res.status(400).json({ error: 'speech is required' });
        return;
    }

    contextWindow.push(speech);

    //If the window is too big, cut the latest 1/3
    if (contextWindow.length > 15){
        contextWindow = contextWindow.slice(10, -1);
        console.log(contextWindow);
    }

    try {
        // Request emotional data from the CV server
        const emotionServerResponse = await axios.get(EMOTION_SERVER_URL + '/getData');
        const { Age: age, Emotion: emotion } = emotionServerResponse.data;

        //Send everything to Gemini
        const reply = await getOptions(emotion, age, contextWindow);
        reply['Emotion'] = emotion; 
        console.log(reply);
        res.status(200).json(reply);
        return;
    } catch (err) {
        next(new Error(err));
    }   
});

app.use((err, req, res, next) => {
    console.log('ERROR');
    console.error(err.stack);
    res.send(err.response);
    return;
});

app.listen(3000, '172.24.9.249', () => {
    console.log('Server running on http://172.24.9.249:3000');
});
