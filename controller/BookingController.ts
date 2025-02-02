import { FastifyRequest } from "fastify";
import Booking from "../models/Booking";
import BookingService from "../service/BookingService";

class BookingController {
    static async createBooking(req: FastifyRequest<{ Body: Booking }>) {
        const newBooking = new Booking(req.body["username"], req.body["email"], req.body["classId"], "", req.body["bookingDate"]);
        console.log("Creating new booking:", newBooking);
        // const newBooking = new Booking({ ...req.body, id: generateNewId(), });
        return await BookingService.createNewBooking(newBooking);
    }
    static async searchBooking(req: FastifyRequest) {
        const { username, startDate, endDate } = req.query as {
            username?: string;
            startDate?: string;
            endDate?: string;
        };
        return await BookingService.searchBooking(username, startDate, endDate);
    }
    static async getBookingById(req: FastifyRequest<{ Params: { id: string } }>) {
        return await BookingService.getBookingById(req.params.id);
    }
    static async deleteBooking(req: FastifyRequest<{ Params: { id: string } }>) {
        return await BookingService.deleteBooking(req.params.id);
    }
}

export default BookingController;