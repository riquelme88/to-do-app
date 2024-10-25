import { Request, RequestHandler, Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";
import { findUserByEmail } from "../Model/user";
import { createTaskSchema, nameTaskSchema, updateTaskSchema } from "../validation/taskSchema";
import { findTaskByName, findTasks, newTask, removeTask, toogleTask, updateTaskService } from "../Model/task";
import { getUser } from "../Model/auth";

export const getTasks = async (req: ExtendedRequest, res: Response) => {
    const userEmail = req.userEmail

    const user = await findUserByEmail(userEmail as string)
    if (!user) return res.status(401).json({ error: 'Não autorizado' })

    const tasks = await findTasks(user?.id as string)


    res.json({ tasks })
}

export const addTask = async (req: ExtendedRequest, res: Response) => {
    const safeData = createTaskSchema.safeParse(req.body)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    const userEmail = req.userEmail
    const user = await getUser(userEmail as string)
    if (!user) return res.status(400).json({ error: 'Não autorizado' })

    const task = await newTask({
        task: safeData.data?.task as string,
        category: safeData.data?.category as string,
        user: {
            connect: {
                name: user.name,
                email: user.email,
                password: user.password,
                token: user.token,
                id: user.id
            }
        }
    })

    if (!task) return res.status(400).json({ error: 'Ocorreu algum erro' })

    res.status(201).json({ task })

}

export const updateTask = async (req: ExtendedRequest, res: Response) => {
    const safeDataName = nameTaskSchema.safeParse(req.query)
    if (!safeDataName.success) return res.status(401).json({ error: safeDataName.error.flatten().fieldErrors })

    const safeData = updateTaskSchema.safeParse(req.body)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    const userEmail = req.userEmail

    const user = await findUserByEmail(userEmail as string)
    if (!user) return res.status(400).json({ error: 'Ocorreu algum error!' })

    const task = await findTaskByName(safeDataName.data.name as string, user.id)
    if (!task) return res.status(400).json({ error: 'Nenhuma task encontrada' })


    const updatedTask = await updateTaskService(task.id, {
        category: safeData.data?.category,
        task: safeData.data?.task
    })

    res.status(202).json({ updatedTask })
}

export const toogleCompleted = async (req: ExtendedRequest, res: Response) => {
    const safeData = nameTaskSchema.safeParse(req.query)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    const userEmail = req.userEmail

    const user = await findUserByEmail(userEmail as string)
    if (!user) return res.status(400).json({ error: 'Ocorreu algum error!' })

    const task = await findTaskByName(safeData.data.name as string, user.id)
    if (!task) return res.status(400).json({ error: 'Nenhuma task encontrada' })

    if (task?.completed == true) {
        const updatedTask = await toogleTask(task.id, false)
        return res.status(202).json({ updatedTask })
    } else {
        const updatedTask = await toogleTask(task?.id as string, true)
        return res.status(202).json({ updatedTask })
    }
}

export const deleteTask = async (req: ExtendedRequest, res: Response) => {
    const safeData = nameTaskSchema.safeParse(req.query)
    if (!safeData.success) return res.status(401).json({ error: safeData.error.flatten().fieldErrors })

    const userEmail = req.userEmail

    const user = await findUserByEmail(userEmail as string)
    if (!user) return res.status(400).json({ error: 'Ocorreu algum error!' })

    const task = await findTaskByName(safeData.data?.name as string, user.id)
    if (!task) return res.status(400).json({ error: 'Não foi encontrada nenhuma task!' })

    const taskDeleted = await removeTask(task.id)
    if (!taskDeleted) return res.status(400).json({ error: 'Ocorreu erro ao deletar!' })

    res.json({ taskDeleted: 'Task deletada' })
}
