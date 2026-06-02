import { adicionarMembroSetor } from "@/app/lib/actions/setor";
import { State } from "@/app/lib/actions/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { useActionState, useState } from "react";

type MembroDisponivel = {
  id: number;
  nome: string;
};

export default function ModalMembroSetor({
  setorId,
  setorNome,
  membrosDisponiveis,
}: {
  setorId: number;
  setorNome: string;
  membrosDisponiveis: MembroDisponivel[];
}) {
  const [membroId, setMembroId] = useState("");
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    adicionarMembroSetor,
    initialState,
  );
  const [open, setOpenChange] = useState(false);
  const isBanda = setorNome.toLowerCase() === "banda";
  return (
    <Dialog open={open} onOpenChange={setOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar membro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Adicionar membro ao {setorNome}</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="setorId" value={setorId} />
          <input type="hidden" name="membroId" value={membroId} />

          {/* Select de membro */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Membro</label>
            <Select onValueChange={setMembroId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o membro" />
              </SelectTrigger>
              <SelectContent>
                {membrosDisponiveis.length === 0 ? (
                  <p className="text-xs text-slate-400 px-2 py-1">
                    Todos os membros já estão neste setor.
                  </p>
                ) : (
                  membrosDisponiveis.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.nome}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {state.errors?.membroId && (
              <p className="text-xs text-red-500">{state.errors.membroId[0]}</p>
            )}
          </div>

          {/* Select de instrumento — só para Banda */}
          {isBanda && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Instrumento</label>
              <Input
                id="instrumento"
                name="instrumento"
                type="text"
                placeholder="Ex: Violão"
              />
              {state.errors?.instrumento &&
                state.errors.instrumento.map((error: string) => (
                  <p key={error} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          )}

          {state.message && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button className="cursor-pointer" type="submit">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
