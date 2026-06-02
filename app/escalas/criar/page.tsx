// app/escalas/criar/page.tsx
import { roboto } from "@/app/ui/fonts";

export default async function Page() {
  // const setores = await fetchSetoresComMembros();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl`}>Montar escalas</h1>
      </div>
      {/* <CriarEscalaForm setores={setores} /> */}
    </div>
  );
}
