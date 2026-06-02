"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { State } from "./types";

const SetorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
});

const VincularDiretorSchema = z.object({
  setorId: z.coerce.number().min(1, "Selecione um setor"),
  membroId: z.coerce.number().min(1, "Selecione um diretor"),
});

export async function vincularDiretor(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const resultado = VincularDiretorSchema.safeParse({
    setorId: formData.get("setorId"),
    membroId: formData.get("membroId"),
  });

  if (!resultado.success) {
    return {
      message: null,
      errors: resultado.error.flatten().fieldErrors,
    };
  }

  const { setorId, membroId } = resultado.data;

  try {
    await prisma.setor.update({
      where: { id: setorId },
      data: { diretorId: membroId },
    });
  } catch (error) {
    return { message: "Erro ao vincular diretor.", errors: {} };
  }

  redirect("/escalas/setor");
}

export async function adicionarSetor(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const resultado = SetorSchema.safeParse({
    nome: formData.get("nome"),
  });

  if (!resultado.success) {
    return {
      message: null,
      errors: resultado.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.setor.create({
      data: { nome: resultado.data.nome },
    });
  } catch (error) {
    return { message: "Erro ao criar setor" };
  }

  revalidatePath("/escalas/setor");
  redirect("/escalas/setor");
}

export async function deleteSetor(id: number) {
  await prisma.setor.delete({
    where: { id },
  });
  revalidatePath("/escalas/setor");
}

export async function adicionarMembroSetor(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const resultado = z.object({
    membroId: z.coerce.number().min(1, "Selecione um membro"),
    setorId: z.coerce.number(),
    instrumento: z.string().nullish(),
  }).safeParse({
    membroId: formData.get("membroId"),
    setorId: formData.get("setorId"),
    instrumento: formData.get("instrumento"),
  });

  if (!resultado.success) {
    return { errors: resultado.error.flatten().fieldErrors, message: null };
  }

  try {
    await prisma.membroSetor.create({
      data: resultado.data,
    });
  } catch (error) {
    return { message: "Erro ao adicionar membro ao setor." };
  }

  revalidatePath(`/escalas/setor/${resultado.data.setorId}/membros`);
  redirect(`/escalas/setor/${resultado.data.setorId}/membros`);
}

export async function removerMembroSetor(membroId: number, setorId: number) {
  try {
    await prisma.membroSetor.delete({
      where: { membroId_setorId: { membroId, setorId } },
    });
  } catch {
    throw new Error("Erro ao remover membro do setor.");
  }

  revalidatePath(`/escalas/setor/${setorId}/membros`);
}