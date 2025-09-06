import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Flashcard } from './entities/flashcard.entity';
import { StudySession } from './entities/study-session.entity';
import { Summary } from './entities/summary.entity';
import { AuthModule } from './Auth/Module/auth-module.module';
import { ConfigModule } from '@nestjs/config';
import { GroqModule } from './groq/Module/groq.module';
import { Question } from './entities/question.entity';
import { StudiesModule } from './Studies/studies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Flashcard, Summary, StudySession, Question],
      synchronize: true,
    }),
    AuthModule,
    GroqModule,
    StudiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
