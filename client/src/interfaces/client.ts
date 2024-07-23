export interface IFilters{
    limit:number;
    page:number;
    id:string;
}

export interface IClientsResponse{

  docs: IClient[];
  total: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
}

export type IClient = {
    _id: string;
    name: string;
    email: string;
    fatherSurname: string;
    motherSurname: string;
    bornDate: string;
    state:string;
    active:boolean;
  };


  export enum CLIENTSTATUS {
    PROSPECTO= 'Prospecto',
    ACTIVO = 'Activo',
    INACTIVO = 'Inactivo',
    BLOQUEADO = 'Bloqueado'
  }
 