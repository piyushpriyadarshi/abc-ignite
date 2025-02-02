
import Fastify from 'fastify';
import { config } from '../config';
import DbClient from '../client/DbClient';
import ClassRoutes from '../routes/ClassRoutes';
import { generateDatesBetween } from '../utils/DateUtils';
import { Class, OccurrenceType } from '../models/Class';
import { log } from 'console';
import ClassService from '../service/ClassService';
import { generateNewId } from '../utils/Uuid';
import { createCustomAjv } from '../config/ajv';
import BookingRoutes from '../routes/BookingRoutes';


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

// Health check route
server.get('/health', async () => {
    return { status: 'ok' };
});

const start = async () => {
    try {
        //initialize the db
        console.log('Initializing the database connection...');
        await server.register(ClassRoutes, { prefix: '/api/v1/classes' });
        await server.register(BookingRoutes, { prefix: '/api/v1/bookings' });
        const db = await DbClient.getInstance();

        await server.listen({ port: parseInt(config.PORT), host: '0.0.0.0' });
        console.log(`🚀 CMS API listening on port ${config.PORT}`);

        // console.log(`🚀 CMS API listening on port ${config.PORT}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();