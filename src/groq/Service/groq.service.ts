import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Groq } from 'groq-sdk';

@Injectable()
export class GroqService {
    private groq: Groq
    constructor() {
        this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    }

    async generateSummary(content: string): Promise<string> {
        const prompt = `Write a detailed and comprehensive summary of the following content in about 500 words or more. Return only the plain text summary without any formatting or labels:\n\n${content}`;
        try {
            const result = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                temperature: 1,
                max_completion_tokens: 1024,
                stream: false,
            });
            return result.choices[0]?.message?.content?.trim() ?? '';
        } catch (error) {
            throw new HttpException("Couldn't generate summary", HttpStatus.BAD_REQUEST);
        }
    }



    async generateFlashcards(content: string): Promise<{ title: string; text: string }[]> {
        const prompt = `Generate detailed flashcards from the following content. Each flashcard should have a concise but thorough title and an explanation text of about 200-300 words. Return an array of flashcards in JSON format like [{ "title": "...", "text": "..." }, ...]:\n\n${content}`;
        try {
            const result = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                temperature: 0.8,
                max_completion_tokens: 800,
                stream: false,
            });
            const raw = result.choices[0]?.message?.content ?? '[]';

            const match = raw.match(/\[\s*{[\s\S]*?}\s*]/);
            const jsonText = match ? match[0] : '[]';

            return JSON.parse(jsonText);
        } catch (error) {
            return [];
        }
    }


    async generateQuestions(content: string): Promise<{ question: string; answer: string }[]> {
        const prompt = `Generate detailed questions and answers from the following content. Each question should be clear and thorough, and each answer should provide an in-depth explanation of about 200-300 words. Return an array of objects in JSON format like [{ "question": "...", "answer": "..." }, ...]:\n\n${content}`;

        try {
            const result = await this.groq.chat.completions.create({
                messages: [{ role: 'user', content: prompt }],
                model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                temperature: 0.8,
                max_completion_tokens: 1200,
                stream: false,
            });

            const raw = result.choices[0]?.message?.content ?? '[]';

            const match = raw.match(/\[\s*{[\s\S]*?}\s*]/);
            const jsonText = match ? match[0] : '[]';

            return JSON.parse(jsonText);
        } catch (error) {
            return [];
        }
    }

}

