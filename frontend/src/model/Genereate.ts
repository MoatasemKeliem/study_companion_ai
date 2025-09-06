export interface IGenerateSummary {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
        email: string;
        password: null;
        role: string;
    },
    createdAt: string;
}

export interface IGenerateFlashcard {
    id: number;
    content: string,
    user: {
        id: number;
        name: string;
        email: string;
        password: null;
        role: string;
    },
    createdAt: string;
}

export interface IGenerateQuestion {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
        email: string;
        password: null;
        role: string;
    },
    createdAt: string;
}