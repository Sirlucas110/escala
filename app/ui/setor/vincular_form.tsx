"use client";

import { vincularDiretor } from "@/app/lib/actions/setor";
import { State } from "@/app/lib/actions/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useActionState, useState } from "react";

type Setor = {
  id: number;
  nome: string;
  diretor: { nome: string } | null;
};

type Diretor = {
  id: number;
  nome: string;
};

export default function VincularDiretorForm({
  setores,
  diretores,
}: {
  setores: Setor[];
  diretores: Diretor[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(vincularDiretor, initialState);
  const [setorId, setSetorId] = useState("");
  const [membroId, setMembroId] = useState("");

  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto py-10">
      {/* Setor */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Setor</label>
        <input type="hidden" name="setorId" value={setorId} />
        <Select onValueChange={setSetorId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o setor" />
          </SelectTrigger>
          <SelectContent>
            {setores.map((setor) => (
              <SelectItem key={setor.id} value={String(setor.id)}>
                {setor.nome}
                {setor.diretor && (
                  <span className="text-xs text-slate-400 ml-2">
                    (atual: {setor.diretor.nome})
                  </span>
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.errors?.setorId &&
          state.errors.setorId.map((error: string) => (
            <p key={error} className="text-xs text-red-500">
              {error}
            </p>
          ))}
      </div>

      {/* Diretor */}
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

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}

      <div className="flex justify-end gap-3">
        <Link
          href="/escalas/setor"
          className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Cancelar
        </Link>
        <Button type="submit">Vincular diretor</Button>
      </div>
    </form>
  );
}
