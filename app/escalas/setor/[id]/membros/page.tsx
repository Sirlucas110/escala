// app/escalas/setor/[id]/membros/page.tsx
import { roboto } from "@/app/ui/fonts";
import MembrosSetor from "@/app/ui/setor/membros-table";
import {
  fetchMembrosPorSetor,
  fetchMembrosDisponiveis,
  fetchSetorById,
} from "@/lib/data";

import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const setorId = parseInt(id);

  const [setor, membrosDoSetor, membrosDisponiveis] = await Promise.all([
    fetchSetorById(setorId),
    fetchMembrosPorSetor(setorId),
    fetchMembrosDisponiveis(setorId),
  ]);

  if (!setor) notFound();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl`}>{setor.nome}</h1>
      </div>

      <MembrosSetor
        membrosDisponiveis={membrosDisponiveis}
        setorId={setorId}
        setorNome={setor.nome}
        membrosDoSetor={membrosDoSetor}
      />
    </div>
  );
}
