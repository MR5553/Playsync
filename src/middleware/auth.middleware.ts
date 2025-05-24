import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "src/model/Users.model";
import { jwtToken } from "src/types/jwt.types";
import { apiError } from "src/utils/Error.api";


export default async function auth(req: Request, _res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", " ");

        if (!token) throw new apiError(401, "Unauthorized Access! 🔒 Please log in to continue.");

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwtToken;

        const user = await Users.findById(decodedToken._id).select("-profileInfo.password -refreshToken");

        if (!user) throw new apiError(401, "Inavalid access token!");

        req.user = user;

        return next();

    } catch (error) {
        throw new apiError(
            500,
            "Internal server Error. Please try again later.",
            error
        )
    }
}