import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { initApp } from '../../app';
import { FastifyInstance } from 'fastify';
import { log } from 'console';


let fastify: FastifyInstance;

beforeAll(async () => {
    fastify = await initApp();
    await fastify.ready();
});

afterAll(() => {
    fastify.close();
});


describe('Booking Routes', () => {
    it('should create a new booking', async () => {
        // First, create a new class to book
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

        const createClassResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/classes',
            payload: newClass,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const createdClass = createClassResponse.json();

        // Now, create a booking for the class
        const newBooking = {
            classId: createdClass.id,
            username: 'testuser',
            email: 'testuser@example.com',
            bookingDate: '2025-02-03'
        };

        const createBookingResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/bookings',
            payload: newBooking,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        expect(createBookingResponse.statusCode).toBe(200);
        console.log(createBookingResponse.json());

        // expect(createBookingResponse.json()).toMatchObject({
        //     id: expect.any(String),
        //     classId: createdClass.id,
        //     username: 'testuser',
        //     email: 'testuser@example.com',
        //     bookingDate: '2025-02-03'
        // });
    });
    it('should not allow booking if capacity is exceeded', async () => {
        // First, create a new class with limited capacity
        const newClass = {
            name: 'Pilates Class',
            "startDate": "2025-02-02",
            "endDate": "2025-03-27",
            "startTime": "10:25",
            "duration": 60,
            "capacity": 1,
            "occurrence": "daily"
        };

        const createClassResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/classes',
            payload: newClass,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const createdClass = createClassResponse.json();

        // Create the first booking
        const firstBooking = {
            classId: createdClass.id,
            username: 'testuser',
            email: 'testuser@example.com',
            bookingDate: '2025-02-03'
        };

        const firstBookingResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/bookings',
            payload: firstBooking,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(firstBookingResponse.json());


        expect(firstBookingResponse.statusCode).toBe(200);

        // Attempt to create a second booking which should exceed the capacity
        const secondBooking = {
            classId: createdClass.id,
            username: 'user2',
            email: 'user2@example.com',
            bookingDate: '2025-02-03'
        };

        const secondBookingResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/bookings',
            payload: secondBooking,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        expect(secondBookingResponse.statusCode).toBe(400);

    });

    it('should search bookings by username', async () => {
        //     // First, create a new class to book
        const newClass = {
            name: 'Pilates Class',
            "startDate": "2025-02-02",
            "endDate": "2025-03-27",
            "startTime": "10:25",
            "duration": 60,
            "capacity": 10,
            "occurrence": "daily"
        };

        const createClassResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/classes',
            payload: newClass,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const createdClass = createClassResponse.json();

        // Now, create a booking for the class
        const newBooking = {
            classId: createdClass.id,
            username: 'searchuser',
            email: 'searchuser@example.com',
            bookingDate: '2025-02-03'
        };

        const bookingResponse = await fastify.inject({
            method: 'POST',
            url: '/api/v1/bookings',
            payload: newBooking,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(bookingResponse.json());

        // Search for bookings by username
        const searchResponse = await fastify.inject({
            method: 'GET',
            url: '/api/v1/bookings/search',
            query: {
                username: 'searchuser'
            }
        });
        console.log(searchResponse.json());


        expect(searchResponse.statusCode).toBe(200);
        expect(searchResponse.json()).toBeInstanceOf(Array);
    });
});