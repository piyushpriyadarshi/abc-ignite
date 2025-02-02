

export const BookingSchema = {
    create: {
        body: {
            type: 'object',
            required: ['classId', 'username', 'email', "bookingDate"],
            properties: {
                classId: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                bookingDate: { type: 'string', }
            },
        },
    },
    search: {
        querystring: {
            type: 'object',
            properties: {
                username: { type: 'string' }, // To search by member (username)
                startDate: { type: 'string', format: 'date' }, // Start of the date range
                endDate: { type: 'string', format: 'date' }, // End of the date range
            },
            anyOf: [
                {
                    required: ['username'],
                },
                {
                    required: ['startDate', 'endDate'],
                },
                {
                    required: ['startDate'],
                },
                {
                    required: ['username', 'startDate', 'endDate'],
                },
            ],
        },
    },
}