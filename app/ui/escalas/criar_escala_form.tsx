// "use client";

// import { criarEscala } from "@/app/lib/actions/escala";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { useActionState, useState } from "react";
// import { State } from "@/app/lib/actions/types";

// type Membro = { id: number; nome: string };
// type MembroSetor = { membroId: number; instrumento: string | null; membro: Membro };
// type Setor = { id: number; nome: string; membros: MembroSetor[] };

// export default function CriarEscalaForm({ setores }: { setores: Setor[] }) {
//   const initialState: State = { message: null, errors: {} };
//   const [state, formAction] = useActionState(criarEscala, initialState);

//   const [selecionados, setSelecionados] = useState
//     <Record<number, { membroId: number; instrumento?: string }[]>
//   >({});
//   const [musicas, setMusicas] = useState<string[]>([""]);

//   function toggleMembro(setorId: number, membroId: number, instrumento?: string) {
//     setSelecionados((prev) => {
//       const atuais = prev[setorId] ?? [];
//       const jaEsta = atuais.some((m) => m.membroId === membroId);
//       return {
//         ...prev,
//         [setorId]: jaEsta
//           ? atuais.filter((m) => m.membroId !== membroId)
//           : [...atuais, { membroId, instrumento }],
//       };
//     });
//   }

//   return (
//     <form action={formAction} className="space-y-6">

//       {/* Input hidden com todos os dados serializados */}
//       <input
//         type="hidden"
//         name="selecionados"
//         value={JSON.stringify(selecionados)}
//       />

//       {/* Data */}
//       <div className="space-y-1">
//         <label className="text-sm font-medium">Data do sábado</label>
//         <Input type="date" name="data" />
//       </div>

//       {/* Músicas */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Músicas</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2">
//           {musicas.map((musica, index) => (
//             <Input
//               key={index}
//               placeholder={`Música ${index + 1}`}
//               name="musicas"
//               value={musica}
//               onChange={(e) =>
//                 setMusicas((prev) => prev.map((m, i) => (i === index ? e.target.value : m)))
//               }
//             />
//           ))}
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => setMusicas((prev) => [...prev, ""])}
//           >
//             + Adicionar música
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Setores */}
//       {setores.map((setor) => (
//         <Card key={setor.id}>
//           <CardHeader>
//             <CardTitle className="text-base">{setor.nome}</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             {setor.membros.length === 0 ? (
//               <p className="text-xs text-slate-400">Nenhum membro neste setor.</p>
//             ) : (
//               setor.membros.map((ms) => {
//                 const isBanda = setor.nome.toLowerCase() === "banda";
//                 const selecionado = (selecionados[setor.id] ?? []).some(
//                   (m) => m.membroId === ms.membroId
//                 );
//                 return (
//                   <div key={ms.membroId} className="flex items-center gap-3">
//                     <Checkbox
//                       checked={selecionado}
//                       onCheckedChange={() =>
//                         toggleMembro(setor.id, ms.membroId, ms.instrumento ?? undefined)
//                       }
//                     />
//                     <span className="text-sm">{ms.membro.nome}</span>
//                     {isBanda && ms.instrumento && (
//                       <span className="text-xs text-slate-400">({ms.instrumento})</span>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </CardContent>
//         </Card>
//       ))}

//       {state.message && (
//         <p className="text-sm text-red-500">{state.message}</p>
//       )}

//       <Button type="submit" className="w-full">
//         Salvar Escala
//       </Button>
//     </form>
//   );
// }