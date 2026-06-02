import { deleteSetor } from "@/app/lib/actions/setor";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";

export function DeleteSetor({ id }: { id: number }) {
  const deleteSetorWithId = deleteSetor.bind(null, id);

  return (
    <form action={deleteSetorWithId}>
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

export function CriarSetor() {
  return (
    <Button variant={"default"} asChild>
      <Link href="/escalas/setor/criar">
        <span className="hidden md:block">Criar setor</span>
      </Link>
    </Button>
  );
}

export function VincularDiretor() {
  return (
    <Button variant={"default"} asChild>
      <Link href="/escalas/setor/vincular">
        <span className="hidden md:block">Vincular diretor</span>
      </Link>
    </Button>
  );
}
