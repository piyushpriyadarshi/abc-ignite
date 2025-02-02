
// import { Booking } from '../models/Booking'; // Ensure this path is correct or update it to the correct path
import { v4 as uuidv4 } from 'uuid';
import DbClient from '../client/DbClient';
import Booking from '../models/Booking';
import ApiError from '../config/errors/ApiError';



const fetchClassInstancequery = "select ci.id, c.capacity, datetime(ci.instance_date / 1000, 'unixepoch') as timimg from class_instances ci left join classes c on c.id = ci.class_id WHERE ci.class_id = ? and date(ci.instance_date / 1000, 'unixepoch') = ?";

class BookingService {
    static async searchBooking(username: string | undefined, startDate: string | undefined, endDate: string | undefined) {
        const db = await DbClient.getInstance();
        let query = 'SELECT * FROM bookings WHERE 1=1';  // Starting point for dynamic query

        const params: any[] = [];

        if (username) {
            query += ' AND user_name LIKE ?';
            params.push(`%${username}%`);
        }

        if (startDate && endDate) {
            query += ' AND booking_date BETWEEN ? AND ?';
            params.push(startDate, endDate);
        } else if (startDate) {
            query += ' AND booking_date >= ?';
            params.push(startDate);
        } else if (endDate) {
            query += ' AND booking_date <= ?';
            params.push(endDate);
        }

        const bookings = await db.all(query, params);
        return bookings;
    }
    static async createNewBooking(newBooking: Booking) {
        console.log("Creating new booking:", newBooking);

        const db = await DbClient.getInstance();
        const classInstance = await db.get(fetchClassInstancequery, [newBooking.classId, newBooking.bookingDate]);
        console.log(classInstance);


        // const classInstance = await db.get("SELECT * FROM class_instances WHERE id = ?", [newBooking.classInstanceId]);
        if (!classInstance) {
            throw new ApiError(`Class is not available on ${newBooking.bookingDate}`, 404);
        }
        newBooking.classInstanceId = classInstance.id;
        const totalBookings = await db.get("SELECT COUNT(*) as count FROM bookings WHERE class_instance_id = ?", [classInstance.id]) || { count: 0 };
        console.log(totalBookings);

        if (totalBookings.count >= classInstance.capacity) {
            throw new ApiError(`Class is fully booked on ${newBooking.bookingDate}`, 400);
        } else {
            // create the boo
            await db.run("INSERT INTO bookings (id, user_name, user_email, class_instance_id, booking_date) VALUES (?, ?, ?, ?, ?)",
                [newBooking.id, newBooking.username, newBooking.email, newBooking.classInstanceId, newBooking.bookingDate]);
            return newBooking;
        }
    }
    static async getBookingById(id: string) {
        const db = await DbClient.getInstance();
        const booking = await db.get("SELECT * FROM bookings WHERE id = ?", [id]);
        if (!booking) {
            throw new ApiError(`Booking with ID ${id} not found`, 404);
        }
        return booking;
    }
    static async deleteBooking(id: string) {
        const db = await DbClient.getInstance();
        const booking = await db.get("SELECT * FROM bookings WHERE id = ?", [id]);
        if (!booking) {
            throw new ApiError(`Booking with ID ${id} not found`, 404);
        }
        await db.run("DELETE FROM bookings WHERE id = ?", [id]);
        return {
            message: "Booking deleted successfully",
        }
    }
}


export default BookingService;