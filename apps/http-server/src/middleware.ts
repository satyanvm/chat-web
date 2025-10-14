import { JWT_SECRET } from "./config.js"
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
export const middleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers["authorization"] ?? ""

    const decoded = jwt.verify(token, JWT_SECRET)
    if(decoded){
        //@ts-ignore
        req.userId = decoded.userId
    }
    else{
        res.status(403).json({
            message:  "could not authorize you"
        })
    } 
}