import { Router } from "express";
import * as authController from '../controllers/authController'
import * as tasksController from '../controllers/tasksController'
import * as categoryController from '../controllers/categoryController'
import { middleware } from "../middleware/auth";

export const router = Router()

router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.post('/login', authController.loginUser)
router.post('/register', authController.registerUser)

router.post('/task', middleware as any, tasksController.addTask as any)
router.get('/tasks', middleware as any, tasksController.getTasks as any)
router.put('/tasks', middleware, tasksController.updateTask as any)
router.put('/task', middleware, tasksController.toogleCompleted as any)
router.delete('/task', middleware, tasksController.deleteTask as any)

router.get('/tasks/category', middleware, categoryController.getCategory)

