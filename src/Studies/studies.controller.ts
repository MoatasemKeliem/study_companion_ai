import { Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/entities/user.entity';
import { RolesGuard, Roles } from 'src/Strategy/roles.guard';

@Controller('studies')
export class StudiesController {
    constructor(
        private studiesService: StudiesService
    ) { }

    // SUMMARY 

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/summaries')
    @Roles(UserRole.ADMIN)
    async getAllSummaries() {
        return this.studiesService.getAllSummaries()
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/summarry/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getSummaryById(@Param("id") id: number) {
        return this.studiesService.getSummaryById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/summarry/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteSummaryById(@Param("id") id: number) {
        return this.studiesService.deleteSummaryById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/summaries/me')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getAllMySummaries(@Request() req) {
        return this.studiesService.getAllSummariesForUser(req.user.id)
    }

    // FLASHCARDS 


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/flashcards')
    @Roles(UserRole.ADMIN)
    async getAllFlashcards() {
        return this.studiesService.getAllFlashcards()
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/flashcard/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getFlashCardById(@Param("id") id: number) {
        return this.studiesService.getFlashcardById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/flashcard/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteFlashcardById(@Param("id") id: number) {
        return this.studiesService.deleteFlashcardById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/flashcards/me')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getAllMyFlashcards(@Request() req) {
        return this.studiesService.getAllFlashcardsForUser(req.user.id)
    }

    // QUESTIONS 


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/questions')
    @Roles(UserRole.ADMIN)
    async getAllQuestions() {
        return this.studiesService.getAllQuestions()
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/question/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getQuestionById(@Param("id") id: number) {
        return this.studiesService.getQuestionById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Delete('/question/:id')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async deleteQuestionById(@Param("id") id: number) {
        return this.studiesService.deleteQuestionById(id);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/questions/me')
    @Roles(UserRole.ADMIN, UserRole.USER)
    async getAllMyQuestions(@Request() req) {
        return this.studiesService.getAllQuestionsForUser(req.user.id)
    }
}
