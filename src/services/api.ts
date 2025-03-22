import { API_URL, VITE_AUDIENCE, VITE_SCOPE } from "@/config/config";
import { ApiResponse } from "@/types/Response";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosRequestConfig } from "axios";



export const useGetAccessToken = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getAccessToken = async () => {
        try {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: VITE_AUDIENCE,
                    scope: VITE_SCOPE,
                },
            });
            return accessToken;
        } catch (e) {
            console.error("Error getting access token", e);
        }
    };

    return getAccessToken;
};

export async function apiRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    accessToken?: string,
    body?: any,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data: body,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                ...(config?.headers || {}),
            },
            ...config,
        });

        return response.data;
    } catch (error: any) {
        console.log("erroren api");
        console.log(error);
        return {
            success: false,
            message: error.response?.data?.message || "Unknown error",
            errors: error.response?.data?.errors || null,
        };
    }
}
