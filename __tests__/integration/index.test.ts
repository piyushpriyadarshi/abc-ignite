import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { initApp } from '../../app';
import { FastifyInstance } from 'fastify';

// Load environment variables from .env.test file

let fastify: FastifyInstance;

beforeAll(async () => {
    // console.log(process.env.DB_PATH);

    fastify = await initApp();
    await fastify.ready();
});

afterAll(() => {
    fastify.close();
});

describe('Health Check', () => {
    it('should return a greeting message', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/health'
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({ status: 'ok' });
    });
});