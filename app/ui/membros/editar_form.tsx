"use client";


import { atualizarMembro } from "@/app/lib/actions/membro";
import { State } from "@/app/lib/actions/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

import { useActionState, useState } from "react";

type Membro = {
  id: number;
  nome: string;
  email: string;
  perfil: string;
};

export default function EditForm({ membro }: { membro: Membro }) {
  const initialState: State = { message: null, errors: {} };
  const atualizarMembroWithId = atualizarMembro.bind(null, membro.id);
  const [state, formAction] = useActionState(
    atualizarMembroWithId,
    initialState,
  );
  const [perfil, setPerfil] = useState(membro.perfil);

  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto py-10">
      {/* Nome */}
      <div className="space-y-1">
        <label htmlFor="nome" className="text-sm font-medium">
          Nome
        </label>
        <Input
          id="nome"
          name="nome"
          type="text"
          placeholder="Ex: Gabriel CG"
          defaultValue={membro.nome}
        />
        {state.errors?.nome &&
          state.errors.nome.map((error: string) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
      </div>
      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Ex: gabriel@email.com"
          defaultValue={membro.email}
        />
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
      </div>
      {/* Perfil — Select + input hidden */}
      <div className="space-y-1">
        <label htmlFor="perfil" className="text-sm font-medium">
          Perfil
        </label>
        <input type="hidden" name="perfil" value={perfil} />
        <Select onValueChange={setPerfil} defaultValue={membro.perfil}>
          <SelectTrigger id="perfil">
            <SelectValue placeholder="Selecione o perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MEMBRO">Membro</SelectItem>
            <SelectItem value="DIRETOR">Diretor</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.perfil &&
          state.errors.perfil.map((error: string) => (
            <p key={error} className="text-sm text-red-500">
              {error}
            </p>
          ))}
      </div>
      <div id="form-error" aria-live="polite" aria-atomic="true">
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/escalas/membros"
          className="flex h-9 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit" size={"lg"}>
          Adicionar
        </Button>
      </div>
    </form>
  );
}
