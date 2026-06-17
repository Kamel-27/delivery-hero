declare namespace Express {
    interface Request {
        correlationId?: string;
        user?: {
            user_id: number;
            role: string;
            email: string;
        };
    }
}