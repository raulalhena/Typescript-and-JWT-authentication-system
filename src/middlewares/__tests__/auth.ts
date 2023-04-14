import {jest} from "@jest/globals"
import validateToken from "../auth";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

describe("validateToken test", ()=> {
    it("Should create the req.body.user with validate information if token is validated", ()=> {
        const res = {} as unknown as Response;
        const req = {
            header: jest.fn(() => "Bearer 1234"),
            body: {
                user: ""
            }
        } as unknown as Request;
        const next = jest.fn();

        const validate = jest
        .spyOn(jwt, "verify")
        .mockImplementation(() => validate);
        validateToken(req, res, next);
        expect(req.body.user).toEqual(validate);
        expect(next).toHaveBeenCalled();
    });

    it("Should deny access if token is not in header", () => {
        const res = {
            json(response: unknown) {
                expect(response).toEqual({"code": 401, "message": "Unauthorized"});
            },
            status(responseStatus: number) {
                expect(responseStatus).toEqual(401);
                return this;
            }
        } as unknown as Response;
        const req = {
            header: jest.fn(),
            body: {
                user: ""
            }
        } as unknown as Request;
        const next = jest.fn();
        const validate = validateToken(req, res, next);
        expect(req.header).toHaveBeenCalledWith("authorization");
        expect(req.body.user).not.toEqual(validate);
    });
});

