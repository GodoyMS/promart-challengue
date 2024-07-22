import { DeleteClient } from '@client/controllers/deleteClient';
import { ReadClient } from '@client/controllers/readClients';
import { SignUpClient } from '@client/controllers/signUp';
import { UpdateClient } from '@client/controllers/updateClient';
import express, { Router } from 'express';

class ClientRoutes {
   private router: Router;

   constructor() {
      this.router = express.Router();
   }

   public routes(): Router {
      this.router.post('/clients/create', SignUpClient.prototype.create);
      this.router.get('/clients/read', ReadClient.prototype.read);
      this.router.delete('/clients/delete/:id', DeleteClient.prototype.deleteById);
      this.router.put('/clients/update-info/:id', UpdateClient.prototype.updateById);
      this.router.put('/clients/update-state/:id', UpdateClient.prototype.updateStateById);

      return this.router;
   }


}

export const clientRoutes: ClientRoutes = new ClientRoutes();
