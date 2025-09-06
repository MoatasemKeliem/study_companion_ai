import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudySession } from "./study-session.entity";
import { Flashcard } from "./flashcard.entity";
import { Summary } from "./summary.entity";
import { Question } from "./question.entity";


export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @OneToMany(() => StudySession, (session) => session.user)
    studySessions: StudySession[];

    @OneToMany(() => Summary, summary => summary.user)
    summaries: Summary[];

    @OneToMany(() => Flashcard, flashcard => flashcard.user)
    flashcards: Flashcard[];

    @OneToMany(() => Question, question => question.user)
    questions: Question[];
}