import dotenv from 'dotenv';

dotenv.config();
export const config = {
    apiKey: process.env.API_KEY || '',
    entitySecret: process.env.ENTITY_SECRET || '',
};
