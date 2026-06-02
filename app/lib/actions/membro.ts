"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { State } from "./types";
import { toast } from "sonner";

const FormSchema = z.object({
  id: z.int(),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  perfil: z.enum(["MEMBRO", "DIRETOR", "ADMIN"], {
    message: "Selecione um perfil válido",
  }),
});

const AdicionarMembro = FormSchema.omit({ id: true });
const AtualizarMembro = FormSchema.omit({ id: true });

export async function adicionarMembro(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = AdicionarMembro.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    perfil: formData.get("perfil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltando campos. Falha em adicionar membro",
    };
  }

  const { nome, email, perfil } = validatedFields.data;

  try {
    await prisma.membro.create({
      data: { nome, email, perfil },
    });
  } catch (error) {
    return {
      message: "Erro do Banco de dados: Falha ao adicionar membro",
    };
  }

  revalidatePath("/escalas/membros");
  redirect("/escalas/membros");
}

export async function deleteMembro(id: number) {
  await prisma.membro.delete({
    where: { id },
  });
  revalidatePath("/escalas/membros");
}

export async function atualizarMembro(
  id: number,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = AtualizarMembro.safeParse({
    nome: formData.get("nome"),
    email: formData.get("email"),
    perfil: formData.get("perfil"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltando campos. Falha em atualizar membro",
    };
  }

  const { nome, email, perfil } = validatedFields.data;

  try {
    await prisma.membro.update({
      where: { id },
      data: { nome, email, perfil },
    });
  } catch (error) {
    return {
      message: "Erro do Banco de dados: Falha ao atualizar membro",
    };
  }

  revalidatePath("/escalas/membros");
  redirect("/escalas/membros");
}
