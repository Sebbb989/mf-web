import axios, { AxiosResponse, AxiosError } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

// Define a generic response type
interface ApiResponse<T = any> {
  data: T;
  error?: string;
}

// Define a generic function for handling Axios responses
const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
  return { data: response.data };
};

// Define a generic function for handling Axios errors
const handleError = (error: AxiosError): ApiResponse<any> => {
  return { data: undefined, error: error.message };
};

// Implement a basic GET function
export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.get<T>(process.env.NEXT_PUBLIC_API_URL + url);
    return handleResponse<T>(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

// Implement a basic POST function
export const post = async <T>(
  url: string,
  data: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios.post<T>(process.env.NEXT_PUBLIC_API_URL + url, data);
    return handleResponse<T>(response);
  } catch (error) {
    return handleError(error as AxiosError);
  }
};
