import { roboto } from "@/app/ui/fonts";
import { AdicionarMembro } from "@/app/ui/membros/button";
import Pagination from "@/app/ui/pagination";
import TableMembros from "@/app/ui/membros/table";
import Search from "@/app/ui/search";

import { fetchTotalPaginasMembros } from "@/lib/data";
import { Metadata } from "next";
import { Suspense } from "react";
import { TableMembrosSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Membros",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTotalPaginasMembros(query);
  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${roboto.className} text-2xl`}>Membros</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar membros..." />
          <AdicionarMembro />
        </div>
        <Suspense key={query + currentPage} fallback={<TableMembrosSkeleton />}>
          <TableMembros query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
