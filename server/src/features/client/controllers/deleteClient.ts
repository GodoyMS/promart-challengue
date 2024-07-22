import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { clientsDbService } from '@services/db/client.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { IClientDocument } from '@client/interfaces/clientDocument.interface';
export class DeleteClient {
   public async deleteById(req: Request, res: Response): Promise<void> {
      const clientId = req.params.id as string;
      const existingClient: IClientDocument | null =
         await clientsDbService.deleteClientById(clientId);
      if (!existingClient) {
         throw new BadRequestError('Client does not exist');
      }
      res.status(HTTP_STATUS.OK).json({ message: 'Client has been deleted' });
   }
}
