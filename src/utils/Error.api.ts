export class apiError extends Error {
    status: number;
    message: string;
    success: false;
    Errors: unknown[];
    constructor(
        status: number,
        message: string,
        Errors: unknown[] = [],
        stack = ""
    ) {
        super(message)
        this.status = status
        this.message = "Something went wrong!";
        this.success = false
        this.Errors = Errors

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};