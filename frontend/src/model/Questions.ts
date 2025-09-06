export interface IQuestions {
    id: number;
    question: string;
    rightAnswer: string;
    user: {
        id: number;
        name: string;
        email: string;
        password: null;
        role: string;
    },
    createdAt: string;
}