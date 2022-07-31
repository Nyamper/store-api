import { Request, Response } from 'express';

class HttpController {
  private formatResponse = (error: Boolean, data: any) => {
    return {
      error,
      data,
    };
  };

  protected formatSuccessResponse = (res: Response, data: any) => {
    console.log(data);

    return res.status(200).json(this.formatResponse(false, data));
  };

  protected formatErrorResponse = (res: Response, error: any) => {
    return res.status(400).json(this.formatResponse(true, error));
  };
}

export default HttpController;
