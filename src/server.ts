/* eslint-disable no-console */
import {Server} from 'http'
import { connectDB } from './app/config/db';
import app from './app';

const PORT = 8080
let server : Server;

async function main(){
    try {
        await connectDB()
        server = app.listen(PORT, ()=>{
            console.log(`App Listening on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()

process.on("unhandledRejection", ()=>{
    console.log("Unhandeled Rejection detected... Server is Shutting down")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});

process.on("uncaughtException", ()=>{
    console.log("Uncought Exception detected... Server is Shutting down")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});

process.on("SIGTERM", ()=>{
    console.log("SIGTERM Signal resived... Server is Shutting down")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});

process.on("SIGINT", ()=>{
    console.log("SIGINT Signal resived... Server is Shutting down")
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
});