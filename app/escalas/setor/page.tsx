import { roboto } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { CriarSetor } from "@/app/ui/setor/buttons";
import TableSetores from "@/app/ui/setor/table_setores";
import { TableSetorSkeleton } from "@/app/ui/skeletons";
import { fetchTotalPaginasSetores } from "@/lib/data";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Setor",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTotalPaginasSetores(query);
  {
    return (
      <>
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${roboto.className} text-2xl`}>Setor</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Buscar setor" />
            <CriarSetor />
          </div>
          <Suspense key={query + currentPage} fallback={<TableSetorSkeleton />}>
            <TableSetores query={query} currentPage={currentPage} />
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </>
    );
  }
}
