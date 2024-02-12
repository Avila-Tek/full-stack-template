import Axios from 'axios';
import { z } from 'zod';
import { ENDPOINT } from './config';

export const getFetch = async <DataType>(
  url: string,
  schema: z.ZodType<DataType> = z.any() as z.ZodType<DataType>,
  options?: RequestInit
): Promise<TFetchOutput<DataType>> => {
  const response = await fetch(ENDPOINT + url, {
    ...options,
  });

  const data = await response?.json();

  // VALIDATE RESPONSE WITH ZOD
  try {
    const parsedData = schema.parse(data);
    return {
      response,
      data: parsedData,
    };
  } catch (error) {
    throw new Error(`Invalid response structure: ${error}`);
  }
};

type TFetchOutput<DataType> = {
  response: Response;
  data: DataType;
};

export const axios = Axios.create({
  baseURL: ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':
      typeof window !== 'undefined' ? localStorage.getItem('token') : undefined,
  },
});

export const axiosS3 = Axios.create({
  baseURL: ENDPOINT,
  headers: {
    'x-amz-acl': 'public-read',
  },
});
