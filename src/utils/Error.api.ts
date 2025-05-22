export class apiError extends Error {
    status: number;
    message: string;
    success: false;
    Errors: unknown[];
    constructor(
        status: number,
        message: "Something went wrong!",
        Errors: unknown[] = [],
        stack = ""
    ) {
        super(message)
        this.status = status
        this.message = message;
        this.success = false
        this.Errors = Errors

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};