import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IClient, IClientsResponse, IFilters } from "@/interfaces/client";
import { Button } from "../ui/button";
import { DeleteIcon, Edit2Icon } from "lucide-react";
import { differenceInYears, format } from "date-fns";
import es from "date-fns/locale/es"

interface IDataTableProps {
  data: IClientsResponse;
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
  setClientIdToDelete: React.Dispatch<React.SetStateAction<string>>;
  setDeleteClientOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectUpdate:(e:IClient)=>void
}
const DataTable = ({
  data,
  filters,
  setFilters,
  setClientIdToDelete,
  setDeleteClientOpen,
  onSelectUpdate
}: IDataTableProps) => {
  return (
    <Table>
      <TableCaption>Clientes registrados</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead className="">Id</TableHead>

          <TableHead className="">Nombre</TableHead>
          <TableHead>Apellido Paterno</TableHead>
          <TableHead>Apellido Materno</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Edad</TableHead>
          <TableHead className="text-right">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.docs.map((client) => (
          <TableRow key={client._id}>
                        <TableCell className="font-medium">{client._id}</TableCell>

            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>{client.fatherSurname}</TableCell>
            <TableCell>{client?.motherSurname}</TableCell>
            <TableCell className="">{client.email}</TableCell>
            <TableCell>{client?.state}</TableCell>
            <TableCell>{ differenceInYears(new Date().toISOString(),client?.bornDate)} años</TableCell>

            <TableCell className=" text-right flex justify-end items-center gap-2 flex-nowrap">
              <Button onClick={()=>onSelectUpdate(client)} className=" mr-2">
                Editar <Edit2Icon />
              </Button>
              <Button
                onClick={() => {
                  setClientIdToDelete(client._id);
                  setDeleteClientOpen(true);
                }}
                type="button"
                variant={"destructive"}
              >
                Eliminar <DeleteIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total {data.total}</TableCell>
          <TableCell className="text-right">
            <Button
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: filters.page - 1 }))
              }
              disabled={!data.hasPrevPage}
              variant={"outline"}
              className=" mr-2"
            >
              Anterior
            </Button>
            <Button
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: filters.page + 1 }))
              }
              disabled={!data.hasNextPage}
              variant={"outline"}
            >
              Siguiente
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DataTable;
