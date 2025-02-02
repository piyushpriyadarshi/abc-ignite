import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { initApp } from '../../app';
import { FastifyInstance } from 'fastify';


let fastify: FastifyInstance;

beforeAll(async () => {
    fastify = await initApp();
    await fastify.ready();
});

afterAll(() => {
    fastify.close();
});


describe('Class Routes', () => {
    it('should get all classes', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/v1/classes'
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toBeInstanceOf(Array);
    });

    it('should create a new class', async () => {
        const newClass = {
            name: 'Yoga Class',
            description: 'A relaxing yoga class',
            "startDate": "2025-02-02",
            "endDate": "2025-03-27",
            "startTime": "10:25",
            "duration": 60,
            "capacity": 2,
            "occurrence": "daily"
        };

        const response = await fastify.inject({
            method: 'POST',
            url: '/api/v1/classes',
            payload: newClass
        });

        expect(response.statusCode).toBe(201);
        expect(response.json()).toMatchObject({
            id: expect.any(String),
            message: 'Class created successfully'
        });
    });
    it('should get a class by id', async () => {
        // First, create a new class to get its ID
        const newClass = {
            name: 'Pilates Class',
            "startDate": "2025-02-02",
            "endDate": "2025-03-27",
            "startTime": "10:25",
            "duration": 60,
            "capacity": 2,
            "occurrence": "daily"
        };

        const createResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/classes',
            payload: JSON.stringify(newClass),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const createdClass = createResponse.json();

        // Now, get the class by ID
        const getResponse = await fastify.inject({
            method: 'GET',
            url: `/api/v1/classes/${createdClass.id}`
        });

        expect(getResponse.statusCode).toBe(200);
        console.log(getResponse.json());

        expect(getResponse.json()).toMatchObject({
            id: createdClass.id,
            name: newClass.name,
            occurrence: newClass.occurrence,
            duration: newClass.duration,
            capacity: newClass.capacity,
            startDate: newClass.startDate,
            endDate: newClass.endDate,
            // startTime: newClass.startTime
        });
    });
});