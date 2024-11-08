import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { errorMiddleware } from './middleware/error.middleware.js'
import appRoutes from './routes/index.js'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import swaggerDocument from '../docs/swagger.json' assert { type: 'json' }

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/v1', appRoutes.getRouter())
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})