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
import { Loader2 } from "lucide-react";
import { validateDate } from "@/lib/utils";

import { toast } from "sonner";

interface IDeleteClientDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
  clientId: string;
}

const DeleteClientDialog = ({
  clientId,
  onSuccess,
  open,
  setOpen,
}: IDeleteClientDialog) => {
  const [{ loading, success, error }, execute] = useFetch<IClient>(
    `/clients/delete/${clientId}`
  );
  const deleteClient = () => {
    execute({ method: "DELETE"});
  };
 
  useEffect(() => {
    if (success) {
      toast.success("Eliminado");
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
          <DialogTitle>Eliminar cliente</DialogTitle>
          <DialogDescription>
            ¿Seguro que quieres eliminar este cliente?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={deleteClient} disabled={loading} type="button">
            {loading ? <Loader2 /> : "Si, eliminar"}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant={"ghost"}
            type="button"
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteClientDialog;
