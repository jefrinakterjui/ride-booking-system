import express, { Application, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandeller } from "./app/middleware/globalErrorHandellar";
import NotFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";


const app : Application = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/v1", router)

app.get('/', (req: Request, res: Response, )=>{
    res.send("Wellcome to Ride Booking System")
})

app.use(globalErrorHandeller);
app.use(NotFound)

export default app;