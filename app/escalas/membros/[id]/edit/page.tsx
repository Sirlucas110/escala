import Breadcrumbs from "@/app/ui/membros/breadcrumbs";
import EditForm from "@/app/ui/membros/editar_form";
import { fetchMembroById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const membro = await fetchMembroById(Number(id));
  if (!membro) {
    notFound(); // redireciona para página 404
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Membros", href: "/escalas/membros" },
          {
            label: "Editar Membro",
            href: `/escalas/membros/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditForm membro={membro} />
    </main>
  );
}
