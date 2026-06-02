"use client";

import { vincularDiretor } from "@/app/lib/actions/setor";
import { State } from "@/app/lib/actions/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";

type Diretor = {
  id: number;
  nome: string;
};

type Props = {
  setorId: number;
  setorNome: string;
  diretores: Diretor[];
  label?: string;
};

export function DialogVincularDiretor({
  setorId,
  setorNome,
  diretores,
  label = "Vincular diretor",
}: Props) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(vincularDiretor, initialState);
  const [membroId, setMembroId] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Vincular diretor</DialogTitle>
          <DialogDescription>
            Vincule ou altere o diretor do setor
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <div className="space-y-1">
            <label className="text-sm font-medium">Setor</label>
            <input type="hidden" name="setorId" value={setorId} />
            <Select disabled defaultValue={String(setorId)}>
              <SelectTrigger className="opacity-60 cursor-not-allowed">
                <SelectValue>{setorNome}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={String(setorId)}>{setorNome}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Diretor</label>
            <input type="hidden" name="membroId" value={membroId} />
            <Select onValueChange={setMembroId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o diretor" />
              </SelectTrigger>
              <SelectContent>
                {diretores.length === 0 ? (
                  <p className="text-xs text-slate-400 px-2 py-1">
                    Nenhum membro com perfil DIRETOR cadastrado.
                  </p>
                ) : (
                  diretores.map((diretor) => (
                    <SelectItem key={diretor.id} value={String(diretor.id)}>
                      {diretor.nome}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {state.errors?.membroId &&
              state.errors.membroId.map((error: string) => (
                <p key={error} className="text-xs text-red-500">
                  {error}
                </p>
              ))}
          </div>

          {state.message && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar vinculação</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
