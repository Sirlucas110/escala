"use client";

import { adicionarSetor } from "@/app/lib/actions/setor";
import { State } from "@/app/lib/actions/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useActionState } from "react";

export default function CriarSetor() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(adicionarSetor, initialState);

  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto py-10">
      {/* Nome */}
      <div className="space-y-1">
        <label htmlFor="nome" className="text-sm font-medium">
          Setor
        </label>
        <Input id="nome" name="nome" type="text" placeholder="Ex: Banda" />
        {state.errors?.nome &&
          state.errors.nome.map((error: string) => (
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
          href="/escalas/setor"
          className="flex h-9 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit" size={"lg"}>
          Criar setor
        </Button>
      </div>
    </form>
  );
}
