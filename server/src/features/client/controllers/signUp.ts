import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { joiValidation } from '@decorators/joi-validation.decorators';
import HTTP_STATUS from 'http-status-codes';
import { signUpClientSchemeValidation } from '@client/schemes/signup';
import { SignUpClientUtility } from './signup.utility';
import { BadRequestError } from '@helpers/errors/badRequestError';
import { clientsDbService } from '@services/db/client.service';
import { IClientDocument } from '@client/interfaces/clientDocument.interface';
export class SignUpClient extends SignUpClientUtility {

   @joiValidation(signUpClientSchemeValidation)
   public async create(req: Request, res: Response): Promise<void> {
      const {email,name,motherSurname,fatherSurname,bornDate,} =
         req.body;

         const clientExist= await clientsDbService.getClientByEmail(email);

         if(clientExist){
            throw new BadRequestError('This email is already in use');
         }
      const clientObjectId: ObjectId = new ObjectId();
      const clientDoc: IClientDocument = SignUpClient.prototype.signUpClient({
         _id: clientObjectId,
         name,
         motherSurname,
         fatherSurname,
         bornDate,
         email
      });
      const createdClient= await clientsDbService.createClient(clientDoc);
      res.status(HTTP_STATUS.CREATED).json({
         message: 'Client  created succesfully',
         doc:createdClient
      });
   }
}


