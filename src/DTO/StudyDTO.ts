import { IsNotEmpty } from "class-validator";

export class StudyDTO {
    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';

    @IsNotEmpty()
    content: string;
}