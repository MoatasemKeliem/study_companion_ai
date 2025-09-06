import {
    Body,
    Controller,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flashcard } from 'src/entities/flashcard.entity';
import { Summary } from 'src/entities/summary.entity';
import { Repository } from 'typeorm';
import { GroqService } from '../Service/groq.service';
import { StudySession } from 'src/entities/study-session.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from 'src/Strategy/roles.guard';
import { UserRole } from 'src/entities/user.entity';
import { Question } from 'src/entities/question.entity';

@Controller('generate')
export class GroqController {
    constructor(
        @InjectRepository(Summary)
        private summaryRepository: Repository<Summary>,
        @InjectRepository(Flashcard)
        private flashCardRepository: Repository<Flashcard>,
        @InjectRepository(StudySession)
        private studySessionRepository: Repository<StudySession>,
        private groqService: GroqService,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/generateSummary')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async generateSummary(@Request() req, @Body("content") content: string) {
        const summaryText = await this.groqService.generateSummary(content);

        const summary = this.summaryRepository.create({
            user: req.user,
            title: content,
            content: summaryText,
            createdAt: new Date(),
        });

        await this.summaryRepository.save(summary);

        return summary;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/generateFlashcards')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async generateFlashCards(@Request() req, @Body("content") content: string) {
        const flashcards = await this.groqService.generateFlashcards(content);

        const flashcardEntities = flashcards.map(fc =>
            this.flashCardRepository.create({
                user: req.user,
                title: fc.title,
                text: fc.text,
                createdAt: new Date(),
            })
        );

        await this.flashCardRepository.save(flashcardEntities);

        return flashcardEntities;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post('/generateQuestions')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async generateQuestions(@Request() req, @Body("content") content: string) {
        const questions = await this.groqService.generateQuestions(content);

        const questionEntities = questions.map(quest =>
            this.questionRepository.create({
                user: req.user,
                question: quest.question,
                rightAnswer: quest.answer,
                createdAt: new Date(),
            })
        );

        await this.questionRepository.save(questionEntities);

        return questionEntities;
    }

}
