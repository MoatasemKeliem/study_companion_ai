import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flashcard } from 'src/entities/flashcard.entity';
import { Question } from 'src/entities/question.entity';
import { StudySession } from 'src/entities/study-session.entity';
import { Summary } from 'src/entities/summary.entity';
import { StudiesController } from './studies.controller';
import { StudiesService } from './studies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Summary,
    Flashcard,
    StudySession,
    Question])
  ],
  providers: [StudiesService],
  controllers: [StudiesController]
})
export class StudiesModule { }
