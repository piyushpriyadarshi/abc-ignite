import Fastify from 'fastify';
import { config } from './config';
import DbClient from './client/DbClient';
import ClassRoutes from './routes/ClassRoutes';
import BookingRoutes from './routes/BookingRoutes';
import { createCustomAjv } from './config/ajv';

export const initApp = async () => {
    const server = Fastify({
        ajv: {
            customOptions: {
                allErrors: true,
                removeAdditional: true,
            },
        },
    });

    // Use the custom AJV instance
    const customAjv = createCustomAjv();
    // @ts-ignore
    server.setValidatorCompiler(({ schema }) => {
        return customAjv.compile(schema);
    });

    // Register routes
    await server.register(ClassRoutes, { prefix: '/api/v1/classes' });
    await server.register(BookingRoutes, { prefix: '/api/v1/bookings' });

    // Initialize the database
    await DbClient.getInstance();

    // Health check route
    server.get('/health', async () => {
        return { status: 'ok' };
    });

    return server;
};