import { Module } from '@nestjs/common';
import { GroqController } from '../Controller/groq.controller';
import { GroqService } from '../Service/groq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from 'src/entities/summary.entity';
import { Flashcard } from 'src/entities/flashcard.entity';
import { StudySession } from 'src/entities/study-session.entity';
import { Question } from 'src/entities/question.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Summary,
            Flashcard,
            StudySession,
            Question
        ])
    ],
    providers: [GroqService],
    controllers: [GroqController]
})
export class GroqModule { }
