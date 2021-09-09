import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCepUseCase } from './ListCepUseCase';

class ListCepController {
  async handle(request: Request, response: Response) {
    const listCepUseCase = container.resolve(ListCepUseCase);

    const all = await listCepUseCase.execute();

    return response.json(all);
  }
}

export { ListCepController };
