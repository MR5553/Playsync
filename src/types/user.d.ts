import { userType } from "./user.types";

declare global {
    namespace Express {
        interface Request {
            user: userType
        }
    }
}