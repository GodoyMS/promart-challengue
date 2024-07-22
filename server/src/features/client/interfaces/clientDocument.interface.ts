import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

//SOLID INTERFACE SEGRETATION
export interface IClientDocument extends Document {
   _id: string | ObjectId;
   name:string;
   fatherSurname: string;
   motherSurname?: string;
   email:string;
   bornDate:number;
   createdAt:Date;
   state:CLIENTSTATUS,
   active:boolean;
}
export enum CLIENTSTATUS {
   PROSPECTO= 'Prospecto',
   ACTIVO = 'Activo',
   INACTIVO = 'Inactivo',
   BLOQUEADO = 'Bloqueado'
 }
