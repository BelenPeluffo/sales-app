import { AxiosClient } from "./axios-client"

export const getAPIRespose = async () => {
    const response = await AxiosClient.get<string>('/');
    return response.data;
}