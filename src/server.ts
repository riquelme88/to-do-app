import express, { urlencoded } from 'express'
import { router } from './routers/router'

const server = express()

server.use(express.json())
server.use(urlencoded({ extended: true }))

server.use('/', router)

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})