import { CLIENTSTATUS, IClientDocument } from '@client/interfaces/clientDocument.interface';
import { IClientUpdate } from '@client/interfaces/updateData.interface';
import { ClientModel } from '@client/models/client.schema';
import mongoose from 'mongoose';

interface ProductQuery {
   $or?: Array<{ sku?: string; name?: string }>;
}

class ClientsDbService {
   public async createClient(data: IClientDocument): Promise<IClientDocument> {
      const createdProduct: IClientDocument = await ClientModel.create(data);
      return createdProduct;
   }

   public async getClientByEmail(
      email: string
   ): Promise<IClientDocument | null> {
      const clientExists: IClientDocument | null = (await ClientModel.findOne({
         email,
      }).exec()) as IClientDocument | null;
      return clientExists;
   }

   public async getClientById(
      id: string
   ): Promise<IClientDocument | null> {
      const clientExists: IClientDocument | null = (await ClientModel.findOne({
         _id:id,
      }).exec()) as IClientDocument | null;
      return clientExists;
   }
   public async getAllClients({
      skip,
      limit,
      id
    }: {
      skip: number;
      limit: number;
      id?: string;
    }): Promise<{ docs: IClientDocument[]; total: number }> {
      let query: { active: boolean; _id?: mongoose.Types.ObjectId } = { active: true };

      if (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
          query._id = new mongoose.Types.ObjectId(id);
        } else {
          // Return empty result if the id is not valid
          return { docs: [], total: 0 };
        }
      }

      const [docs, total] = await Promise.all([
        ClientModel.find(query).skip(skip).limit(limit).exec(),
        ClientModel.countDocuments(query),
      ]);
      return { docs, total };
    }

   public async deleteClientById(id: string): Promise<IClientDocument | null> {
      const client: IClientDocument | undefined =
         (await ClientModel.findByIdAndUpdate(
            id,
            { active: false },
            {
               new: true,
            }
         ).exec()) as IClientDocument;
      return client;
   }

   public async updateClientById(data: {
      clientId: string;
      value: IClientUpdate;
   }): Promise<IClientDocument> {
      const client: IClientDocument | undefined =
         (await ClientModel.findByIdAndUpdate(data.clientId, data.value, {
            new: true,
         }).exec()) as IClientDocument;
      return client;
   }


   public async updateClientStateById(data:{
      clientId:string;
      state:CLIENTSTATUS
   }):Promise<IClientDocument>{
      const client: IClientDocument | undefined =
      (await ClientModel.findByIdAndUpdate(data.clientId, {state:data.state}, {
         new: true,
      }).exec()) as IClientDocument;
   return client;
   }
}

export const clientsDbService: ClientsDbService = new ClientsDbService();
