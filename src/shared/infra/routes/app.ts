import "reflect-metadata"
import express, { NextFunction, Request, Response } from "express";
import { isCelebrateError } from "celebrate";
import "express-async-errors";

import { router } from "./https";
import "../../container"
import { AppError } from "../../errors/AppError";
import  createConnection  from "../typeorm/index";



createConnection();

const app = express();

app.use(express.json());

app.use(router)

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }
      console.log(err.message);

      if (isCelebrateError(err)) {
        const values = err.details.values();
    
        let { message } = values.next().value.details[0];
    
        message = message.replace('"', '').replace('"', '');
    
        return response.status(400).json({
          status: 'error',
          type: 'validation',
          message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error" - ${err.message}`,
      });
    }

  );

export { app }