import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { clientsDbService } from '@services/db/client.service';
import { BadRequestError } from '@helpers/errors/badRequestError';
import {
   CLIENTSTATUS,
   IClientDocument,
} from '@client/interfaces/clientDocument.interface';
import { IClientUpdate } from '@client/interfaces/updateData.interface';
import { UpdateClientUtility } from './update.utility';
import { joiValidation } from '@decorators/joi-validation.decorators';
import { updateClientSchemeValidation, updateClientState } from '@client/schemes/update';

type DefinedProps<T> = {
   [K in keyof T]: Exclude<T[K], undefined>;
};

export class UpdateClient extends UpdateClientUtility {
   @joiValidation(updateClientSchemeValidation)
   public async updateById(req: Request, res: Response): Promise<void> {
      const clientId = req.params.id as string;
      const { email, name, motherSurname, fatherSurname, bornDate } = req.body;
      const updateDate: DefinedProps<IClientUpdate> = {
         ...(email !== undefined ? { email } : {}),
         ...(name !== undefined ? { name } : {}),
         ...(fatherSurname !== undefined ? { fatherSurname } : {}),
         ...(motherSurname !== undefined ? { motherSurname } : {}),
         ...(bornDate !== undefined ? { bornDate } : {}),
      };

      const existingClient = await clientsDbService.getClientById(clientId);
      if (!existingClient) {
         throw new BadRequestError('Client does not exist');
      }

      const updatedClient: IClientDocument | undefined =
         await clientsDbService.updateClientById({
            clientId: clientId,
            value: updateDate,
         });
      await updatedClient.save();

      res.status(HTTP_STATUS.OK).json({
         message: 'Client has been updated',
         doc: updatedClient,
      });
   }
   @joiValidation(updateClientState)
   public async updateStateById(req: Request, res: Response): Promise<void> {
      const clientId = req.params.id as string;
      const { state } = req.body;

      const existingClient = await clientsDbService.getClientById(clientId);
      if (!existingClient) {
        throw new BadRequestError('Client does not exist');
      }
      if(!existingClient.active){
         throw new BadRequestError('Can update a deleted client');

      }

      let updatedClient: IClientDocument | undefined;

      // Update state based on described flow
      if (existingClient.state === CLIENTSTATUS.PROSPECTO && state === CLIENTSTATUS.ACTIVO) {
        updatedClient = await clientsDbService.updateClientStateById({
          clientId: clientId,
          state: CLIENTSTATUS.ACTIVO,
        });
      } else if (existingClient.state === CLIENTSTATUS.ACTIVO && state === CLIENTSTATUS.INACTIVO) {
        updatedClient = await clientsDbService.updateClientStateById({
          clientId: clientId,
          state: CLIENTSTATUS.INACTIVO,
        });
      } else if (existingClient.state === CLIENTSTATUS.INACTIVO && (state === CLIENTSTATUS.INACTIVO || state === CLIENTSTATUS.BLOQUEADO)) {
        updatedClient = await clientsDbService.updateClientStateById({
          clientId: clientId,
          state: state,
        });
      } else if (existingClient.state === CLIENTSTATUS.BLOQUEADO && state === CLIENTSTATUS.ACTIVO) {
        // Special authorization logic not described
        updatedClient = await clientsDbService.updateClientStateById({
          clientId: clientId,
          state: CLIENTSTATUS.ACTIVO,
        });
      } else {
        throw new BadRequestError('Invalid state transition');
      }

      if (updatedClient) {
        await updatedClient.save();
        res.status(HTTP_STATUS.OK).json({
          message: 'Client has been updated',
          doc: updatedClient,
        });
      } else {
        throw new BadRequestError('Client state update failed');
      }
    }

}
