import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ListSpecialtyUseCase } from './ListSpecialtyUseCase';

class ListSpecialtyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecialtiesUseCase = container.resolve(ListSpecialtyUseCase);

    const all = await listSpecialtiesUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecialtyController };
