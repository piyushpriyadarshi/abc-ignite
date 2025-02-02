

export const DB_INIT_QUERY = {
    CREATE_CLASSES_TABLE: `CREATE TABLE IF NOT EXISTS classes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration INTEGER NOT NULL,
    -- in seconds
    capacity INTEGER NOT NULL,
    occurrence TEXT CHECK(
        occurrence IN ('daily', 'weekly', 'alternate_days', 'weekdays')
    )
)`,

    CREATE_CLASS_INSTANCES_TABLE: `CREATE TABLE IF NOT EXISTS class_instances (
    id TEXT PRIMARY KEY,
    class_id INTEGER NOT NULL,
    instance_date DATE NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes (id)
)`,

    CREATE_BOOKINGS_TABLE: `CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    class_instance_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    booking_date DATETIME NOT NULL,
    FOREIGN KEY (class_instance_id) REFERENCES class_instances (id)
)`,
    "booking_index_email": `CREATE INDEX IF NOT EXISTS idx_user_email ON bookings (user_email)`,
    "booking_index_booking_date": `CREATE INDEX IF NOT EXISTS idx_booking_date ON bookings (booking_date)`,
    "idx_user_email_booking_date": `CREATE INDEX IF NOT EXISTS idx_user_email_booking_date ON bookings (user_email, booking_date)`
}