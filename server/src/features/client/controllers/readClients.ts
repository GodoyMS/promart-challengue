import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { clientsDbService } from '@services/db/client.service';
export class ReadClient  {
   public async read(req: Request, res: Response): Promise<void> {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 15;
      const skip = (page - 1) * limit;

      const { docs, total } = await clientsDbService.getAllClients({
         skip,
         limit,
      });
      const totalPages = Math.ceil(total / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      res.status(HTTP_STATUS.OK).json({
         docs,
         total,
         hasPrevPage,
         hasNextPage,
         totalPages,
      });
   }
}
