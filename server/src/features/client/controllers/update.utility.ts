import { IClientDocument } from '@client/interfaces/clientDocument.interface';
import { ISignUpClient } from '@client/interfaces/signUpData.interface';




export abstract class UpdateClientUtility {

   protected updateClient(data:ISignUpClient):IClientDocument{
   const {_id,name,motherSurname,fatherSurname,email,bornDate}=data;
   return{
      _id,
      name,
      motherSurname,
      fatherSurname,
      email,
      bornDate,
      createdAt:new Date()
   } as unknown as IClientDocument;

   }

}
