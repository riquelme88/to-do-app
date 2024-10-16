import { Router } from "express";
import * as authController from '../controllers/auth'

export const router = Router()

router.post('/user', authController.addUser)