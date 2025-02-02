import { FastifyInstance, FastifyRequest } from "fastify"
import { ClassSchema } from "../schema/ClassSchema"
import { Class } from "../models/Class"
import ClassController from "../controller/ClassController"

async function ClassRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: Class }>('/', { schema: ClassSchema.create }, ClassController.create)
    fastify.get('/', ClassController.getAllClasses)
    fastify.get('/:id', ClassController.getClassById)
}

export default ClassRoutes