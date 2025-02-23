import axios, { AxiosResponse } from 'axios';
import CUSTOMAXIOS from "../CustomAxios";

interface LoginRequest {
  email: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}


export const LoginApi = async (email: string): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const requestBody: LoginRequest = { email };

    // Make the POST request
    const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody);

    // Return the entire response
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw the error after logging
  }
};

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const RegisterCustomerAPI = async (bodyParameters: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> => {
  const requestBody: RegisterRequest = {
    ...bodyParameters,
    role: "customer"
  };

  const response = await axios.post<RegisterResponse>(`${import.meta.env.VITE_API_URL}/users`, requestBody);

  return response;
};
export const RegisterPartnersAPI = async (bodyParameters: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> => {
  const requestBody: RegisterRequest = {
    ...bodyParameters,
    role: "service-provider"
  };

  const response = await axios.post<RegisterResponse>(`${import.meta.env.VITE_API_URL}/users`, requestBody);

  return response;
};

export const getUserData = async (): Promise<any> => {
    const response = await CUSTOMAXIOS.get(`${import.meta.env.VITE_API_URL}/auth/verify`);
    return response;
};
