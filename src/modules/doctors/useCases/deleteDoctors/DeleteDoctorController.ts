import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteDoctorUseCase } from './DeleteDoctorUseCase';

class DeleteDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDoctorUseCase = container.resolve(DeleteDoctorUseCase);

    await deleteDoctorUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteDoctorController };
