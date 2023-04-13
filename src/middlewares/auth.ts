import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers["authorization"];
        if(authHeader){
            const token = authHeader.split("Bearer ")[1];
        
            console.log("auth token: ", token);
            
            if(token){
                const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string);
                if(decoded){
                    req.body.user = decoded;
                    return next();
                }else{
                    return res.status(403).json({
                        code: 403
                    });
                }
            }
        }
        return res.status(401).json({
            code: 401,
            message: "Unauthorized"
        });
    }catch(e){
        console.log(`AUTH (validateToken): ${e}`);
        return res.status(401).json({
            code: 401,
            message: "Unauthorized"
        });
    }
}

export default validateToken;