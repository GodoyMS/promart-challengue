
import { clientRoutes } from '@client/routes/clientRoutes';
import { Application } from 'express';

export default (app: Application) => {
   const routes = () => {
     app.use('/api/', clientRoutes.routes());
     
      app.get('/health', (req, res) => {
         res.send('Server running');
      });
   };
   routes();
};
