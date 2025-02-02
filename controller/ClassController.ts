import { FastifyReply, FastifyRequest } from "fastify";
import { Class } from "../models/Class";
import ClassService from "../service/ClassService";
import { generateNewId } from "../utils/Uuid";

class ClassController {
    public static async create(request: FastifyRequest<{ Body: Class }>, reply: FastifyReply) {
        console.log("Creating new class:", request.body);
        const newClass = new Class({ ...request.body, id: generateNewId(), });
        const res = await ClassService.createNewClass(newClass);
        reply.code(201).send(res);
    }
    public static async getAllClasses(request: FastifyRequest) {
        return await ClassService.getAllClasses();
    }
    public static async getClassById(request: FastifyRequest<{ Params: { id: string } }>) {
        return await ClassService.getClassById(request.params.id);
    }
}

export default ClassController;