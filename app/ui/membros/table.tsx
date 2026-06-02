import { AtualizarMembro, DeleteMembro } from "@/app/ui/membros/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMembros } from "@/lib/data";
import { perfilColorsMembros } from "../badge_colors";


export default async function TableMembros({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const allMembers = await fetchMembros(query, currentPage);
  return (
    <>
      <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {allMembers.map((membro) => (
                  <TableRow key={membro.id}>
                    <TableCell>{membro.nome}</TableCell>
                    <TableCell>{membro.email}</TableCell>
                    <TableCell>
                      <Badge className={perfilColorsMembros[membro.perfil]}>
                        {membro.perfil}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <AtualizarMembro id={membro.id} />
                      <DeleteMembro id={membro.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
