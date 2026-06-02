import Breadcrumbs from "@/app/ui/membros/breadcrumbs";
import CriarSetor from "@/app/ui/setor/criar_setor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar",
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Setor", href: "/escalas/setor" },
          {
            label: "Criar Setorers",
            href: "/escalas/setor/criar",
            active: true,
          },
        ]}
      />
      <CriarSetor />
    </main>
  );
}
