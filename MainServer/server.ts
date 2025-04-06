import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
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

//Get next dialogue options based on opponent's emotions and recent talk
app.post('/dialogue', async (req, res, next) => {
    const speech = req.body;

    if (!speech) {
        res.status(400).json({ error: 'speech is required' });
        return;
    }

    try {
        const emotionServerResponse = await axios.get(EMOTION_SERVER_URL + '/getData');
        const { Age: age, Emotion: emotion } = emotionServerResponse.data;
        //Send everything to Gemini
        const reply = await getOptions(emotion, age, speech);
        res.status(200).json(reply);
        return;
    } catch (err) {
        next(new Error(err));
    }
});

app.get('/image', (req, res, next) => {});

app.use((err, req, res, next) => {
    console.log('ERROR');
    console.error(err.stack);
    res.send(err.response);
    return;
});

app.listen(3000, '127.0.0.1', () => {
    console.log('Server running on http://localhost:3000');
});
