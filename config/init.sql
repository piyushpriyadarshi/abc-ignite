

Go
;

CREATE TABLE IF NOT EXISTS class_instances (
    id TEXT PRIMARY KEY,
    class_id INTEGER NOT NULL,
    instance_date DATE NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes (id)
);

Go
;

CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    class_instance_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    booking_date DATETIME NOT NULL,
    FOREIGN KEY (class_instance_id) REFERENCES class_instances (id)
);

Go
;

CREATE INDEX IF NOT EXISTS idx_user_email ON bookings (user_email);

Go
;

CREATE INDEX IF NOT EXISTS idx_booking_date ON bookings (booking_date);

Go
;

CREATE INDEX IF NOT EXISTS idx_user_email_booking_date ON bookings (user_email, booking_date);