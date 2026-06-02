import prisma from "../lib/prisma";

async function main() {
  await prisma.membro.createMany({
    data: [
      {
        nome: "Lucas Moraes",
        email: "lucas@email.com",
        perfil: "ADMIN",
      },
      {
        nome: "João Silva",
        email: "joao@email.com",
        perfil: "MEMBRO",
      },
    ],
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });