// "use server"

// import prisma from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
// import { z } from 'zod';
// import { State } from './types';

// const EscalaItemSchema = z.object({
//   membroId: z.coerce.number(),
//   instrumento: z.string().optional(),
// });

// const CriarEscalaSchema = z.object({
//   data: z.string().min(1, "Data é obrigatória"),
//   musicas: z.array(z.string()).nullish(),
//   setorId: z.coerce.number(),
//   itens: z.array(EscalaItemSchema).min(1, "Selecione ao menos um membro"),
// });

// export async function criarEscala(prevState: State, formData: FormData): Promise<State> {
//   const data = formData.get("data") as string;
//   const musicas = formData.getAll("musicas") as string[];
//   const selecionadosRaw = formData.get("selecionados") as string;

//   let selecionados: Record<string, { membroId: number; instrumento?: string }[]> = {};

//   try {
//     selecionados = JSON.parse(selecionadosRaw);
//   } catch {
//     return { message: "Erro ao processar membros selecionados.", errors: {} };
//   }

//   for (const [setorId, itens] of Object.entries(selecionados)) {
//     if (itens.length === 0) continue;

//     const resultado = CriarEscalaSchema.safeParse({
//       data,
//       musicas,
//       setorId,
//       itens,
//     });

//     if (!resultado.success) {
//       return {
//         errors: resultado.error.flatten().fieldErrors,
//         message: null,
//       };
//     }

//     try {
//       await prisma.escala.create({
//         data: {
//           data: new Date(resultado.data.data),
//           setorId: resultado.data.setorId,
//           musicas: resultado.data.musicas ?? [],
//           itens: {
//             create: resultado.data.itens,
//           },
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       return { message: "Erro ao criar escala." };
//     }
//   }

//   revalidatePath("/escalas");
//   redirect("/escalas");
// }