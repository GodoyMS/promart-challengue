import { ObjectId } from 'mongodb';
//SOLID INTERFACE SEGRETATION



export interface ISignUpClient {
   _id: ObjectId;
   name:string;
   fatherSurname:string;
   motherSurname?:string;
   email:number;
   bornDate:Date;
}
