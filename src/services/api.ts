import { API_URL } from "@/config/config";
import { ApiResponse } from "@/types/Response";
import axios, { AxiosRequestConfig } from "axios";

export async function apiRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data: body,
            ...config,
        });

        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Unknown error",
            errors: error.response?.data?.errors || null,
        };
    }
}
