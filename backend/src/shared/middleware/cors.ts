import { cors } from '@elysiajs/cors';

export const corsMiddleware = cors({
    origin: ['http://localhost:8081'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-refresh-token'],
    credentials: false
});