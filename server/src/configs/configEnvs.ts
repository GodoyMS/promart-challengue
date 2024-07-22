import dotenv from 'dotenv';

dotenv.config({});

class Config {
   public DATABASE_URL: string | undefined;
   public CLIENT_URL: string | undefined;
   public PORT: string | undefined;

   constructor() {
      this.DATABASE_URL = process.env.DATABASE_URL;
      this.CLIENT_URL = process.env.CLIENT_URL;
      this.PORT = process.env.PORT;
   }
   public validateConfig(): void {
      console.log(this);
      for (const [key, value] of Object.entries(this)) {
         if (value === undefined) {
            throw new Error(`Configuration ${key} is undefined`);
         }
      }
   }


}

export const config: Config = new Config();
