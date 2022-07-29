import { Request, Response } from 'express';

const formatResponse = (error: Boolean, data: any) => {
  return {
    error,
    data,
  };
};

export const formatSuccessResponse = (res: Response, data: any) => {
  console.log(data);

  return res.status(200).json(formatResponse(false, data));
};

export const formatErrorResponse = (res: Response, error: Error) => {
  return res.status(400).json(formatResponse(true, error));
};
