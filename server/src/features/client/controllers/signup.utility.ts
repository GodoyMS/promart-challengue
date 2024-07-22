import { CLIENTSTATUS, IClientDocument } from '@client/interfaces/clientDocument.interface';
import { ISignUpClient } from '@client/interfaces/signUpData.interface';

export abstract class SignUpClientUtility {

   protected signUpClient(data:ISignUpClient):IClientDocument{
   const {_id,name,motherSurname,fatherSurname,email,bornDate}=data;
   return{
      _id,
      name,
      motherSurname,
      fatherSurname,
      email,
      bornDate,
      state:CLIENTSTATUS.PROSPECTO,
      active:true,
      createdAt:new Date()
   } as unknown as IClientDocument;

   }

}
