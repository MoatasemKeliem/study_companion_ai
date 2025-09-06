import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { StudySession } from './study-session.entity';
import { User } from './user.entity';

@Entity()
export class Flashcard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    text: string;

    @ManyToOne(() => User, user => user.flashcards)
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}