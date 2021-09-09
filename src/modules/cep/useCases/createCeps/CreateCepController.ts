import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCepUseCase } from './CreateCepUseCase';

class CreateCepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cep } = request.body;

    const createCepUseCase = container.resolve(CreateCepUseCase);

    await createCepUseCase.execute(cep);

    return response.status(201).send();
  }
}

export { CreateCepController };
