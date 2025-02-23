import axios, { 
    AxiosInstance, 
    AxiosError, 
    InternalAxiosRequestConfig,
    AxiosResponse 
  } from 'axios';
  
  // Custom error response type
  interface ErrorResponse {
    status: number;
    message?: string;
    [key: string]: any;
  }
  
  const CUSTOMAXIOS: AxiosInstance = axios.create({
    headers: {
      'Content-type': 'application/json'
    }
  });
  
  // Request interceptor
  CUSTOMAXIOS.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem('AUTH_ACCESS_TOKEN');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );
  
  // Response interceptor
  CUSTOMAXIOS.interceptors.response.use(
    // Success handler - unwrap response data
    (response: AxiosResponse): any => response.data,
    
    // Error handler
    (error: AxiosError): Promise<never> => {
      if (error.response) {
        const errorData: ErrorResponse = {
          ...(error.response.data as object),
          status: error.response.status
        };
        return Promise.reject(errorData);
      }
      return Promise.reject(new Error(error.message));
    }
  );
  
  export default CUSTOMAXIOS;