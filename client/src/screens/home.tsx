import DataTable from "@/components/home";
import DeleteClientDialog from "@/components/home/delete-client-dialog";
import NewClientDialog from "@/components/home/new-client-dialog";
import UpdateClientDialog from "@/components/home/update-client-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useRequest";
import { IClient, IClientsResponse, IFilters } from "@/interfaces/client";
import { PlusCircle, PlusCircleIcon } from "lucide-react";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const HomeScreen = () => {
  const [{ loading, success, data, error }, execute] =
    useFetch<IClientsResponse>("/clients/read");

  const [filters, setFilters] = useState<IFilters>({
    page: 1,
    limit: 10,
    id: "",
  });

  useEffect(() => {
    execute({
      method: "GET",
      params: {
        page: filters.page,
        limit: filters.limit,
      },
    });
  }, [filters.page, filters.limit]);

  const searchById = () => {
    setFilters((prev) => ({ ...prev, page: 1, limit: 10 }));
    execute({
      method: "GET",
      params: {
        page: 1,
        limit: 10,
        id: filters.id,
      },
    });
  };
  const refetch = () => {
    execute({ method: "GET", data: filters });
  };

  const [newClientOpen, setNewClientOpen] = useState<boolean>(false);

  const [clientIdToDelete, setClientIdToDelete] = useState<string>("");
  const [deleteClientOpen, setDeleteClientOpen] = useState<boolean>(false);

  const [clientToUpdate, setClientToUpdate] = useState<IClient | null>(null);
  const [updateClientOpen, setUpdateClientOpen] = useState<boolean>(false);

  const onSelectUpdate = (e: IClient) => {
    setClientToUpdate(e);
    setUpdateClientOpen(true);
  };

  if (error) {
    return (
      <div className=" flex items-center  flex-col mt-10 gap-2 justify-center">
        Ops, ocurrió un problema.
        <Button onClick={refetch} className="">
          Volver a intentarlo
        </Button>
      </div>
    );
  }
  return (
    <div>
      <DeleteClientDialog
        clientId={clientIdToDelete}
        open={deleteClientOpen}
        setOpen={setDeleteClientOpen}
        onSuccess={refetch}
      />
      <NewClientDialog
        onSuccess={refetch}
        open={newClientOpen}
        setOpen={setNewClientOpen}
      />
      <UpdateClientDialog
        onSuccess={refetch}
        open={updateClientOpen}
        setOpen={setUpdateClientOpen}
        clientToUpdate={clientToUpdate}
      />

      <div className=" mb-4 flex justify-between flex-col gap-4 md:flex-row">
        <div className="flex  w-full w-full md:max-w-sm items-center space-x-2">
          <Input
            type="text"
             className="flex-1 md:flex-none"
            value={filters.id}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, id: e.target.value }))
            }
            placeholder="669eebfc02a7a28abb70cc06"
          />
          <Button disabled={loading} onClick={searchById} type="button">
            Buscar
          </Button>
        </div>
        <div className=" flex justify-end gap-2 items-center">
          <Button className=" flex-1 md:flex-none" onClick={() => setNewClientOpen(true)}>
            Nuevo Cliente <PlusCircle className=" ml-2" />
          </Button>

          <Select
            value={filters.limit as unknown as string}
            onValueChange={(val) => {
              setFilters((prev) => ({ ...prev, limit: Number(val) }));
            }}
          >
            <SelectTrigger className=" w-10">
              <SelectValue placeholder="Límite" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <>
          {data && success && (
            <div>
              <DataTable
                onSelectUpdate={onSelectUpdate}
                setDeleteClientOpen={setDeleteClientOpen}
                setClientIdToDelete={setClientIdToDelete}
                setFilters={setFilters}
                filters={filters}
                data={data}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeScreen;
