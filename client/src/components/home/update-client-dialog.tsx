import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useFetch from "@/hooks/useRequest";
import { IClient } from "@/interfaces/client";
import { FormEvent, useEffect, useState } from "react";
import { Calendar as CalendarIcon, Loader2, Loader2Icon } from "lucide-react";
import { cn, validateDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IUpdateClientDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  clientToUpdate: IClient | null;

}

const UpdateClientDialog = ({
  clientToUpdate,
  onSuccess,
  open,
  setOpen,
}: IUpdateClientDialog) => {
  useEffect(() => {
    if (clientToUpdate) {
      setFormInput({
        name: clientToUpdate.name,
        fatherSurname: clientToUpdate.fatherSurname,
        motherSurname: clientToUpdate?.motherSurname,
        email: clientToUpdate.email,
        bornDate: clientToUpdate.bornDate.slice(0, 10),
      });

      setState(clientToUpdate.state);
    }
  }, [clientToUpdate]);

  const [formInput, setFormInput] = useState<{
    name: string;
    fatherSurname: string;
    motherSurname: string;
    email: string;
    bornDate: string | undefined;
  }>({
    name: "",
    fatherSurname: "",
    motherSurname: "",
    email: "",
    bornDate: undefined,
  });

  const [stateUpdateState, executeUpdateState] = useFetch<{doc:IClient,message:string}>(
    `/clients/update-state/${clientToUpdate?._id}`
  );
  const [state, setState] = useState("");

  const updateClientState = (stringVal: string) => {
    executeUpdateState({
      method: "PUT",
      data: {
        state: stringVal,
      },
    });
  };

  useEffect(() => {
    if (stateUpdateState.error) {
      toast.error("Este cambio de estado no esta permitido");
    }
  }, [stateUpdateState.error]);

  useEffect(() => {
    if (stateUpdateState.data && stateUpdateState.success) {
      setState(stateUpdateState.data.doc.state);
      toast.success("Estado cambiado")
      onSuccess();
    }
  }, [stateUpdateState.data,stateUpdateState.success]);

  const [{ loading, success, data, error }, execute] = useFetch<IClient>(
    `/clients/update-info/${clientToUpdate?._id}`
  );

  const submitUpdateInfo = (e: FormEvent) => {
    e.preventDefault();
    const valid = validateDate(formInput.bornDate);
    if (!valid) {
      toast.warning(
        "La fecha no puede estar en el futuro y la edad debe ser mayor a 18 años"
      );
      return;
    }
    execute({ method: "PUT", data: formInput });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev) => ({ ...prev, bornDate: event.target.value }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Actualizado");
      onSuccess();
      setOpen(false);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error("Ocurrió un error, intentalo más tarde");
    }
  }, [error]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar cliente</DialogTitle>
          <DialogDescription>
            Edita a este cliente y luego presiona actualizar
          </DialogDescription>
        </DialogHeader>

        <Select
          value={state}
          onValueChange={(val) => {
            updateClientState(val);
          }}
        >
          <SelectTrigger className="full">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          {stateUpdateState.loading ? (
            <Loader2Icon className=" animate-spin" />
          ) : (
            <SelectContent>
              <SelectItem value="Prospecto">Prospecto</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Bloqueado">Bloqueado</SelectItem>
            </SelectContent>
          )}
        </Select>
        <form onSubmit={submitUpdateInfo}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nombres (*)</Label>
              <Input
                id="name"
                type="text"
                required
                value={formInput.name}
                onChange={(e) =>
                  setFormInput((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Apellido Paterno (*)</Label>
              <Input
                id="name"
                type="text"
                required
                value={formInput.motherSurname}
                onChange={(e) =>
                  setFormInput((prev) => ({
                    ...prev,
                    motherSurname: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Apellido Materno</Label>
              <Input
                id="name"
                type="text"
                value={formInput.fatherSurname}
                onChange={(e) =>
                  setFormInput((prev) => ({
                    ...prev,
                    fatherSurname: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Email (*)</Label>
              <Input
                id="name"
                type="email"
                required
                value={formInput.email}
                onChange={(e) =>
                  setFormInput((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className=" flex flex-col gap-2">
              <Label>Fecha de nacimiento</Label>
              <Input
                id="date-picker"
                type="date"
                required
                value={formInput.bornDate || ""}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 /> : "Actualizar cliente"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateClientDialog;
