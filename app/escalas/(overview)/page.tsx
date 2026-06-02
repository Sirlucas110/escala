import { CriarEscalas } from "@/app/ui/escalas/buttons";
import { roboto } from "@/app/ui/fonts";

export default async function Page() {
  const data = new Date()

  const mes = data.toLocaleDateString("pt-BR", {month: 'long'})
  const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1)
  return (
    <div className="w-full">
      <div className="mb-6 md:mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className={`${roboto.className} text-2xl`}>Escala dos Sábados</h1>
          <p className="text-muted-foreground mt-1">Escola Sabatina Jovem - {mesCapitalizado} 2026</p>
        </div>
      <CriarEscalas />
      </div>
    </div>
  );
}
