import { FastifyInstance, FastifyRequest } from "fastify"
import { BookingSchema } from "../schema/BookingSchema"
import BookingController from "../controller/BookingController"
import Booking from "../models/Booking"


async function BookingRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: Booking }>('/', { schema: BookingSchema.create }, BookingController.createBooking)
    // fastify.get('/', ClassController.getAllClasses)
    // fastify.get('/:id', ClassController.getClassById)
    fastify.get('/search', { schema: BookingSchema.search }, BookingController.searchBooking)
    fastify.get('/:id', BookingController.getBookingById);
    fastify.delete('/:id', BookingController.deleteBooking);

}

export default BookingRoutes