"use client";

import { removerMembroSetor } from "@/app/lib/actions/setor";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import ModalMembroSetor from "./modal_membros_setor";

type MembroDoSetor = {
  membroId: number;
  instrumento: string | null;
  membro: { id: number; nome: string; email: string };
};

type MembroDisponivel = {
  id: number;
  nome: string;
};

export default function MembrosSetor({
  setorId,
  setorNome,
  membrosDoSetor,
  membrosDisponiveis,
}: {
  setorId: number;
  setorNome: string;
  membrosDoSetor: MembroDoSetor[];
  membrosDisponiveis: MembroDisponivel[];
}) {
  const isBanda = setorNome.toLowerCase() === "banda";

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ModalMembroSetor
          membrosDisponiveis={membrosDisponiveis}
          setorId={setorId}
          setorNome={setorNome}
        />
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Tabela */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                {isBanda && <TableHead>Instrumento</TableHead>}
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {membrosDoSetor.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isBanda ? 4 : 3}
                    className="text-center text-slate-400 py-8"
                  >
                    Nenhum membro neste setor ainda.
                  </TableCell>
                </TableRow>
              ) : (
                membrosDoSetor.map((ms) => (
                  <TableRow key={ms.membroId}>
                    <TableCell>{ms.membro.nome}</TableCell>
                    <TableCell>{ms.membro.email}</TableCell>
                    {isBanda && <TableCell>{ms.instrumento ?? "—"}</TableCell>}
                    <TableCell className="flex justify-end">
                      <form
                        action={removerMembroSetor.bind(
                          null,
                          ms.membroId,
                          setorId,
                        )}
                      >
                        <Button
                          type="submit"
                          className="cursor-pointer"
                          variant="destructive"
                          size="icon"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
