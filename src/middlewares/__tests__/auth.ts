import {jest} from "@jest/globals"
import validateToken from "../auth";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

describe("validateToken test", ()=> {
    it("Should create the req.body.user with validate information if token is validated", ()=> {
        const res = {};
        const req = {
            header: jest.fn(() => "myAuthToken")
        }
        const next = jest.fn();

        const validate = jest
        .spyOn(jwt, "verify")
        .mockImplementation(() => validate);
        validateToken(req, res, next);
    });
});

it("Should deny access if token is not in header", () => {
    const res = {
        json(code: number, message: string) {
            expect(code).toEqual(401);
            expect(message).toEqual("Unauthorized");
        },
        status(responseStatus: number) {
            expect(responseStatus).toEqual(401);
            return this;
        }
    }
    const req = {
        header: jest.fn(),
        body: {
            user: ""
        }
    }
    const next = jest.fn();
    const validate = validateToken(req, res, next);
    expect(req.header).toHaveBeenCalledWith("authentication");
    expect(req.body.user).not.toEqual({ userId: String(validate) });
    
});