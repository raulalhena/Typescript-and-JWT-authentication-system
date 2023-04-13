import { Request, Response } from "express";
import * as userDal from "../db/dal/user";
import { UserInput, UserOutput } from "../db/models/User";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try{
        const user = await userDal.getUser(req.body.name, req.body.password);
        if(user){
            const token = generateToken(user.name);

            console.log("login token: ", token)

            const toUpdate = {
                userId: user.id,
                token
            }

            const userUpdated = userDal.updateUser(toUpdate);
            if(userUpdated !== null){
                return res.status(200).json({
                    code: 200,
                    message: "Logged succesfully"
                });
            }
            return res.status(400).json({
                code: 400,
                message: "User not updated"
            })
        }else{
            return res.status(404).json({
                code: 404,
                message: "User not found"
            });
        }
    }catch(e){
        console.log(`Users (loginUser): ${e}`);
        return res.status(400).json({
            code: 400,
            message: "Error occurred login user"
        });
    }
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try{
        const users = await userDal.getAllUsers();
        return res.status(200).json({
            code: 200,
            message: "Users info",
            users
        });
    }catch(e){
        console.log(`CONTROLLERS USERS (getUsers): ${e}`);
        return res.status(400).json({
            code: 400,
            message: "Error occurred getting users"
        });
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser: UserInput = {
        name: req.body.name,
        password: req.body.password,
        token: ""
    }
    try{
        const createdUser = await userDal.createUser(newUser);
        return res.status(200).json({
            code: 200,
            createdUser
        });
    }catch(e){
        console.log(`Users (createUser): ${e}`);
        return res.status(400).json({
            code: 400,
            message: "Error creating new user"
        });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const toUpdate = {
        ...req.body
    }

    try{
        const user = await userDal.updateUser(toUpdate);
        return res.status(200).json({
            code: 200,
            user
        })
    }catch(e){
        console.log(`CONTROLLERS USER(updateUser): ${e}`);
        return res.status(400).json({
            code: 400,
            message: "Error occurred updating user"
        });
    }
}
