import DbClient from "../client/DbClient";
import { Class } from "../models/Class";
import { generateDatesBetween } from "../utils/DateUtils";
import { generateNewId } from "../utils/Uuid";

class ClassService {
    static async createNewClass(newClass: Class) {
        const db = await DbClient.getInstance();
        console.log("Creating new class:", newClass);
        try {
            await db.run("BEGIN TRANSACTION");
            const result = await db.run(
                "INSERT INTO classes (id,name, start_date, end_date, occurrence,duration,capacity,start_time) VALUES (?,?, ?, ?, ?,?,?,?)",
                [
                    newClass.id,
                    newClass.name,
                    newClass.startDate.getTime(),
                    newClass.endDate.getTime(),
                    newClass.occurrence,
                    newClass.duration,
                    newClass.capacity,
                    newClass.startTime,
                ]
            );

            console.log(result);



            // Insert into `classes_instance` using the fetched `classId`
            // Assuming the structure of `classes_instance` table includes `class_id` and other columns
            interface ClassInstance {
                id: string;
                classId: string;
                date: Date;
            }

            const instances: ClassInstance[] = [];

            const classDates = generateDatesBetween(newClass.startDate, newClass.endDate, newClass.occurrence);
            for (const date of classDates) {
                console.log("Inserting class instance for date:", date);

                instances.push({ id: generateNewId(), classId: newClass.id, date });
            }
            for (const instance of instances) {
                await db.run(
                    `INSERT INTO class_instances (id,class_id, instance_date) VALUES (?,?, ?)`,
                    [instance.id, instance.classId, instance.date.getTime()]
                );
            }

            // Commit the transaction
            await db.run("COMMIT");
            return { id: newClass.id, message: "Class created successfully" };
        } catch (error) {
            console.log("Error occurred while creating a new class:", error);

            await db.run("ROLLBACK");
            throw error;
        }
    }

    static async getAllClasses() {
        const db = await DbClient.getInstance();
        const classes = await db.all("SELECT * FROM classes");
        return classes;
    }
    static async getClassById(id: string) {
        const db = await DbClient.getInstance();
        const classData = await db.get(`select id, name, date(start_date / 1000, 'unixepoch') as startDate, date(end_date / 1000, 'unixepoch') as endDate, duration, capacity, occurrence from classes where id = ? `, [id]);
        if (!classData) {
            const error = new Error(`Class with ID ${id} not found`);
            (error as any).statusCode = 404; // Attach a 404 status code
            throw error; // This can be caught by your global error handler
        }
        return classData;
    }
    static async updateClass(id: string, updatedClass: Class) {
        const db = await DbClient.getInstance();
        await db.run(
            "UPDATE classes SET name = ?, start_date = ?, end_date = ?, occurrence = ?, duration = ?, capacity = ?, start_time = ? WHERE id = ?",
            [
                updatedClass.name,
                updatedClass.startDate,
                updatedClass.endDate,
                updatedClass.occurrence,
                updatedClass.duration,
                updatedClass.capacity,
                updatedClass.startTime,
                id,
            ]
        );
    }
}


export default ClassService;