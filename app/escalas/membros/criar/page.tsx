import Breadcrumbs from "@/app/ui/membros/breadcrumbs";
import CreateForm from "@/app/ui/membros/criar_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adicionar",
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Membros", href: "/escalas/membros" },
          {
            label: "Adicionar Membros",
            href: "/escalas/membros/criar",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
