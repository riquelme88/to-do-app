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

router.post('/task', middleware as any, tasksController.addTask)
router.get('/tasks', middleware as any, tasksController.getTasks)
router.put('/tasks', middleware, tasksController.updateTask)
router.put('/task', middleware, tasksController.toogleCompleted)
router.delete('/task', middleware, tasksController.deleteTask)

router.get('/tasks/category', middleware, categoryController.getCategory)

