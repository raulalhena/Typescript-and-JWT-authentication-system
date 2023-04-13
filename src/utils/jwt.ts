import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateToken(name: string): string {
    const payload = {
        name,
        access: "full"
    }

    const signInOptions: SignOptions = {
        expiresIn: "1h"
    }

    return jwt.sign(payload, process.env.SECRET_TOKEN as string, signInOptions);
}

