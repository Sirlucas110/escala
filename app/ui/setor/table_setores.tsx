import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchSetor } from "@/lib/data";
import { DeleteSetor } from "./buttons";
import { DialogVincularDiretor } from "./modal";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function TableSetores({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const setores = await fetchSetor(query, currentPage);
  const diretores = await prisma.membro.findMany({
    where: { perfil: "DIRETOR" },
    select: { id: true, nome: true },
  });

  return (
    <div className="mt-2 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setor</TableHead>
                <TableHead>Diretor</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {setores.map((setor) => (
                <TableRow key={setor.id}>
                  <TableCell>
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                      {setor.nome}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {setor.diretor ? (
                      setor.diretor.nome
                    ) : (
                      <span className="text-slate-400 text-xs">
                        Sem diretor
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {setor.diretor ? setor.diretor.email : "—"}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <DialogVincularDiretor
                      setorId={setor.id}
                      diretores={diretores}
                      setorNome={setor.nome}
                      label={
                        setor.diretor ? "Trocar diretor" : "Vincular diretor"
                      }
                    />
                    <Button variant="outline" asChild>
                      <Link href={`/escalas/setor/${setor.id}/membros`}>
                        Gerenciar membros
                      </Link>
                    </Button>
                    <DeleteSetor id={setor.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
