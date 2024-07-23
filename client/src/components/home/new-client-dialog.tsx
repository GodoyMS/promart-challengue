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
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import {  validateDate } from "@/lib/utils";

import { toast } from "sonner";

interface INewClientDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
}

const NewClientDialog = ({ onSuccess, open, setOpen }: INewClientDialog) => {
  const [formInput, setFormInput] = useState<{
    name: string;
    fatherSurname: string;
    motherSurname:string;
    email:string;
    bornDate:string | undefined
  }>({
    name: "",
    fatherSurname: "",
    motherSurname: "",
    email: "",
    bornDate: undefined,
  });

  const [{ loading, success, data, error }, execute] =
    useFetch<IClient>("/clients/create");

  const submitEvent = (e: FormEvent) => {
    e.preventDefault();
    const valid = validateDate(formInput.bornDate);
    if (!valid) {
      toast.warning(
        "La fecha no puede estar en el futuro y la edad debe ser mayor a 18 años"
      );
      return;
    }

    execute({ method: "POST", data: formInput });
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput((prev) => ({ ...prev, bornDate: event.target.value }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Registrado");
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
          <DialogTitle>Nuevo Cliente</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitEvent}>
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
              <Label htmlFor="name">Apellido Materno</Label>
              <Input
                id="name"
                type="text"
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
            {loading ? <Loader2 /> : "Registrar cliente"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewClientDialog;
