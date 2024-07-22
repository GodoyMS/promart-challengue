import { IClientDocument } from '@client/interfaces/clientDocument.interface';
import { model, Model, Schema } from 'mongoose';

const clientSchema: Schema = new Schema({
   name: { type: String, required: true },
   fatherSurname: { type: String, required: true },
   motherSurname: { type: String, required: false },
   email: { type: String, required: true, unique: true },
   bornDate: { type: Date, required: true },
   state: { type: String, required: true },
   active:{type:Boolean,required:true},
   createdAt: { type: Date, default: Date.now() },
});

const ClientModel: Model<IClientDocument> = model<IClientDocument>(
   'Client',
   clientSchema,
   'Client'
);
export { ClientModel };
