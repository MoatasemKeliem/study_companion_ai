import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flashcard } from 'src/entities/flashcard.entity';
import { Question } from 'src/entities/question.entity';
import { Summary } from 'src/entities/summary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudiesService {
    constructor(
        @InjectRepository(Summary)
        private summaryRepository: Repository<Summary>,
        @InjectRepository(Flashcard)
        private flashcardsRepository: Repository<Flashcard>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>) { }

    //SUMMARY

    async getAllSummaries() {
        const allSummary = await this.summaryRepository.find();

        allSummary.map((item) => {
            item.user.password = "";
        })

        return allSummary;
    }

    async getSummaryById(id: number) {
        const summaryById = await this.summaryRepository.findOne({ where: { id } })
        if (!summaryById) {
            throw new NotFoundException(`Summary with ID ${id} not found`);
        }
        summaryById.user.password = "";

        return summaryById
    }

    async deleteSummaryById(id: number) {
        const summaryById = await this.summaryRepository.delete({ id })
        if (summaryById.affected === 0) {
            throw new NotFoundException(`Summary with ID ${id} not found`);
        }
        return { message: `Summary with the ID of ${id} was deleted` };
    }

    async getAllSummariesForUser(userId: number) {
        const summaryUser = await this.summaryRepository.find({
            where: { user: { id: userId } },
            relations: ["user"]
        })

        summaryUser.map((item) => {
            item.user.password = ""
        })
        return summaryUser;
    }

    //FLASHCARDS

    async getAllFlashcards() {
        return await this.flashcardsRepository.find();

    }

    async getFlashcardById(id: number) {
        const flashcardById = await this.flashcardsRepository.findOne({ where: { id } })
        if (!flashcardById) {
            throw new NotFoundException(`Flashcard with ID ${id} not found`);
        }
        return flashcardById
    }

    async deleteFlashcardById(id: number) {
        const flashcardById = await this.flashcardsRepository.delete({ id })
        if (flashcardById.affected === 0) {
            throw new NotFoundException(`Flashcard with ID ${id} not found`);
        }
        return { message: `Flashcard with the ID of ${id} was deleted` };
    }

    async getAllFlashcardsForUser(userId: number) {
        const flashcardUser = await this.flashcardsRepository.find({
            where: { user: { id: userId } },
            relations: ["user"]
        })

        flashcardUser.map((item) => {
            item.user.password = ""
        })

        return flashcardUser;
    }

    //Questions

    async getAllQuestions() {
        const allQuestions = await this.questionRepository.find();

        allQuestions.map(item => item.user.password = "")
        return allQuestions
    }

    async getQuestionById(id: number) {
        const questionById = await this.questionRepository.findOne({ where: { id } })
        if (!questionById) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
        questionById.user.password = "";
        return questionById
    }

    async deleteQuestionById(id: number) {
        const questionById = await this.questionRepository.delete({ id })
        if (questionById.affected === 0) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }
        return { message: `Question with the ID of ${id} was deleted` };
    }

    async getAllQuestionsForUser(userId: number) {
        const questionUser = await this.questionRepository.find({
            where: { user: { id: userId } },
            relations: ["user"]
        })

        questionUser.map((item) => {
            item.user.password = "";
        })

        return questionUser
    }
}
