import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column("text")
    rightAnswer: string;

    @ManyToOne(() => User, user => user.questions, { eager: true })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}