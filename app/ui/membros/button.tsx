import { deleteMembro } from "@/app/lib/actions/membro";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, Trash } from "lucide-react";
import Link from "next/link";

export function DeleteMembro({ id }: { id: number }) {
  const deleteMembroWithId = deleteMembro.bind(null, id);

  return (
    <form action={deleteMembroWithId}>
      <Button
        type="submit"
        variant={"destructive"}
        size={"icon"}
        className="cursor-pointer"
      >
        <Trash />
      </Button>
    </form>
  );
}

export function AdicionarMembro() {
  return (
    <Button variant={"default"} asChild>
      <Link href="/escalas/membros/criar">
        <span className="hidden md:block">Adicionar Membro</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function AtualizarMembro({ id }: { id: number }) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={`/escalas/membros/${id}/edit`}>
        <PencilIcon className="w-4 h-4" />
      </Link>
    </Button>
  );
}
