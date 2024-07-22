import { CLIENTSTATUS, IClientDocument } from '@client/interfaces/clientDocument.interface';
import { IClientUpdate } from '@client/interfaces/updateData.interface';
import { ClientModel } from '@client/models/client.schema';

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
   }: {
      skip: number;
      limit: number;
   }): Promise<{ docs: IClientDocument[]; total: number }> {
      const [docs, total] = await Promise.all([
         ClientModel.find({ active: true }).skip(skip).limit(limit).exec(),
         ClientModel.countDocuments({active:true}),
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
