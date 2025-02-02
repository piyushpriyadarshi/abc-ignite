import { v4 as uuidv4 } from 'uuid';
class Booking {
    id: string;
    username: string;
    email: string;
    classInstanceId: string;
    bookingDate: string;
    classId: string;

    constructor(username: string, email: string, classId: string, classInstanceId: string, bookingDate: string) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.classInstanceId = classInstanceId;
        this.bookingDate = bookingDate;
        this.classId = classId;
    }
}

export default Booking;