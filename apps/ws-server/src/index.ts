import { WebSocketServer, WebSocket  } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import { prismaClient } from "db/client";
const wss = new WebSocketServer({port :8080})

   interface User{
        ws: WebSocket,
        userId: string,
        rooms: Number[]
        }

        const users: User[] = []
        
wss.on('connection', function connection(ws, request)  { 
    
    const url = request.url;
    if(!url){
        console.log("returning because of no url")
        return;
    }
    const token = new URLSearchParams(url.split("?")[1])
    //@ts-ignore    
    const decoded = jwt.verify(token ?? "", JWT_SECRET);
    const userId = decoded.userId;    

    if(!decoded || !userId){
        console.log("could not find decoed or decoded.userId")
        ws.close() 
        return;  
    }    

    users.push({ 
        userId: userId, 
        ws: ws,
        rooms: [],
    })

    ws.on('message', async function message(data) {
    
    let parsedData;

    if(typeof data !== "string"){
    parsedData = JSON.parse(data.toString());

    } else{
        parsedData = JSON.parse(data) 
    }

    // if(parsedData.type === "join_room"){
        
    // const user = users.find((x) => parsedData.ws === x.ws)
    // if(!user) {
    //     console.log("WebSocket for the user not found")
    //     return;
    // }

    // user.rooms.push(parsedData.roomId)

    // } 

    if(parsedData.type === "message"){
        
       const message = parsedData.message;
    //    const roomId = parsedData.roomId;

       const user = users.find((x) => parsedData.ws === x.ws)  
        
       await prismaClient.chat.create({ 
        //@ts-ignore
        message: message,
        creatorId: parsedData.userId
        // roomId: roomId
       })     
       
    } 

 
    })


})