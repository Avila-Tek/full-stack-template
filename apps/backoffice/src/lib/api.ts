import Axios from 'axios';
import { env } from 'process';
import { z } from 'zod';

type TFetchInput<DataType> = {
  url: string;
  schema?: z.ZodType<DataType>;
  options?: RequestInit;
};

export const getFetch = async <DataType>({
  url,
  schema = z.any() as z.ZodType<DataType>,
  options = {},
}: TFetchInput<DataType>): Promise<TFetchOutput<DataType>> => {
  const response = await fetch(env.NEXT_PUBLIC_API_URL + url, {
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
    // puede manejar este error como desee
    throw new Error(`Invalid response structure: ${error}`);
  }
};

type TFetchOutput<DataType> = {
  response: Response;
  data: DataType;
};

export const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':
      typeof window !== 'undefined' ? localStorage.getItem('token') : undefined,
  },
});

export const axiosS3 = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    'x-amz-acl': 'public-read',
  },
});
