import { Response } from "express";

interface ApiResponseProps {
    res: Response;
    status?: number;
    message: string;
    data?: unknown;
    error?: unknown;
}


export default function apiResponse({ res, status = 200, message, data = null, error = null,
}: ApiResponseProps) {
    const success = status >= 200 && status < 300;

    const response: Record<string, unknown> = {
        success: success,
        message,
    };

    if (success) {
        response.data = data;
    };

    response.error = error;

    return res.status(status).json(response);
}