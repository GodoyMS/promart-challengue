import { CLIENTSTATUS } from '@client/interfaces/clientDocument.interface';
import Joi, { ObjectSchema } from 'joi';

const updateClientSchemeValidation: ObjectSchema = Joi.object().keys({

   name: Joi.string().optional().min(2). max(50).messages({
      'string.base': 'name must be of type string',
      'string.min': 'Invalid name',
      'string.max': 'Invalid name',
   }),
   fatherSurname: Joi.string().optional().min(2). max(30).messages({
      'string.base': 'Father Surname must be of type string',
      'string.min': 'Invalid Father Surname',
      'string.max': 'Invalid Father Surname',
   }),
   motherSurname: Joi.string().allow('').optional().max(50).messages({
      'string.min': 'Invalid Mother Surname',
      'string.max': 'Invalid Mother Surname',
   }),
   email: Joi.string().email().optional().max(100).messages({
      'string.base': 'email must be type email',
      'string.min': 'Invalid email',
      'string.max': 'Invalid email',
   }),

   bornDate: Joi.date().optional().messages({
      'string.base': 'BornDate must be of type date',
   }),

});

const updateClientState: ObjectSchema = Joi.object().keys({
   state: Joi.string().valid(CLIENTSTATUS.INACTIVO,CLIENTSTATUS.ACTIVO,CLIENTSTATUS.BLOQUEADO).required().min(2). max(15).messages({
      'string.base': 'state must be of type string',
      'string.min': 'Invalid state',
      'string.max': 'Invalid name',
   }),


});

export { updateClientSchemeValidation,updateClientState };
