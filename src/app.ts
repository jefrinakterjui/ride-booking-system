import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandeller } from "./app/middleware/globalErrorHandellar";


const app : Application = express()
app.use(express.json())
app.use(cors())
app.use("/api/v1", router)

app.get('/', (req: Request, res: Response, )=>{
    res.send("Wellcome to Ride Booking System")
})

app.use(globalErrorHandeller)

export default app;