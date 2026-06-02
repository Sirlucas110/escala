import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export function CriarEscalas() {
  return (
    <Button variant={"default"} asChild>
      <Link href="/escalas/criar">
        <span className="hidden md:block">Criar escalas</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}