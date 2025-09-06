import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Flashcard } from './flashcard.entity';
import { Summary } from './summary.entity';


@Entity()
export class StudySession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column()
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.studySessions, { onDelete: 'CASCADE' })
    user: User;
}