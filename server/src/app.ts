import express, { Express } from 'express';
import { PromartChallengueServer } from '@bootstrap/setupServer.bootstrap';
import databaseConnection from '@bootstrap/setupDatabase.bootstrap';
import { config } from '@configs/configEnvs';

class Application {
   public initialize(): void {
      this.loadConfig();
      databaseConnection();
      const app: Express = express();
      const server: PromartChallengueServer = new PromartChallengueServer(app);
      server.start();
   }
   private loadConfig(): void {
      config.validateConfig();
   }
}

const application: Application = new Application();
application.initialize();
