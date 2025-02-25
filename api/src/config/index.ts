import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT ?? 4000,
    updateInterval: Number(process.env.UPDATE_INTERVAL ?? 20000),
    cors: {
        origin: process.env.CORS_ORIGIN ?? '*'
    },
    rateLimiting: {
        windowMs: 15 * 60 * 1000,
        max: 100
    }
};
