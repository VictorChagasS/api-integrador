import express, {Request, Response, NextFunction} from 'express';
import 'dotenv/config'
import {errors} from 'celebrate'
import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import uploadConfig from '@config/upload'
import '@shared/infra/typeorm'
import AppError from '@shared/errors/AppError'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express();

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder ))
app.use(routes);
app.use(errors())

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status:'error',
            message: err.message,
        })
    }
    console.error(err)

    return response.status(500).json({
        status:'error',
        message: 'Internal server error',
    })
})

app.listen(process.env.PORT || 3333, () => {
    console.log("SERVIDOR LIGOU")
});