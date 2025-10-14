import express from "express"
import { prismaClient } from "db/client"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js"
import { middleware } from "./middleware.js"
import cors from "cors";

const app = express() 

app.use(express.json())
app.use(cors())

app.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prismaClient.user.create({
        data: {
            username: username,
            password: password
        }
    })
    res.json({
        userId: user.id
    }) 

})

app.post('signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await prismaClient.user.findFirst({
        where: {
        username: username 
        }
    })
    if(!user){
        console.log("no user found")
        return;
    }
    const userId = user.id;
    
    const token = jwt.sign(userId, JWT_SECRET)

    res.json({
        token
    })

})

// app.post('/room', middleware, (req,res) => {
//     const name = req.body.name;
//     //@ts-ignore
//     const userId = req.userId;

//     const room = prismaClient.room.create({
//         data: {
//             name: name,
//             adminId: userId
//         }
//     })
//     res.json({
//         roomId: room.id
//     })
// })

app.listen(3001)