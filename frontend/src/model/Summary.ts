export interface ISummary {
    id: number;
    title: string;
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