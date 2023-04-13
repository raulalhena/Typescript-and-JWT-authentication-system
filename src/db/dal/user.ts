import { Op } from "sequelize";
import User from "../models/User";
import { UserInput, UserOutput } from "../models/User";

export const getUser = async (name: string, password: string): Promise<User | null> => {
    try{
        const newUser = await User.findOne({
            where: {
                name: name,
                password: password
            }
        });
        
        return newUser;
        
    }catch(e){
        console.log(`DAL User (getUser): ${e}`);
        return null;
    }
}

export const createUser = async (userInfo: UserInput): Promise<UserOutput | null> => {
    try{
        let user = await User.create(userInfo);
        return user;
    }catch(e){
        console.log(`DAL User (createUser): ${e}`);
        return null;
    }
}

export const getAllUsers = async (): Promise<Array<UserOutput>> => {
    const users: UserOutput[] = await User.findAll();
    return users;
}

export const updateUser = async (toUpdate: any): Promise<[affectedCount: number] | null> => {
    try{
        const affectedUsers: [affectedCount: number] = await User.update(toUpdate, {
            where: {
                id: toUpdate.userId
            }
        });
        return affectedUsers;
    }catch(e){
        console.log(`DAL User (updateUser): ${e}`);
        return null;
    }
}
