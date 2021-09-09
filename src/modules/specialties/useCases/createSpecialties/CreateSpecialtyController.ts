import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { CreateSpecialtyUseCase } from './CreateSpecialtyUseCase';

class CreateSpecialtyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSpecialtyUseCase = container.resolve(CreateSpecialtyUseCase);

    await createSpecialtyUseCase.execute(name);

    return response.status(201).send();
  }
}

export { CreateSpecialtyController };
