-- CreateEnum
CREATE TYPE "Perfil" AS ENUM ('ADMIN', 'DIRETOR', 'MEMBRO');

-- CreateTable
CREATE TABLE "Membro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" "Perfil" NOT NULL,

    CONSTRAINT "Membro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "diretorId" INTEGER,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembroSetor" (
    "membroId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "instrumento" TEXT,

    CONSTRAINT "MembroSetor_pkey" PRIMARY KEY ("membroId","setorId")
);

-- CreateTable
CREATE TABLE "Escala" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "setorId" INTEGER NOT NULL,
    "musicas" TEXT[],

    CONSTRAINT "Escala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscalaItem" (
    "escalaId" INTEGER NOT NULL,
    "membroId" INTEGER NOT NULL,
    "instrumento" TEXT,

    CONSTRAINT "EscalaItem_pkey" PRIMARY KEY ("escalaId","membroId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membro_email_key" ON "Membro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Setor_diretorId_key" ON "Setor"("diretorId");

-- AddForeignKey
ALTER TABLE "Setor" ADD CONSTRAINT "Setor_diretorId_fkey" FOREIGN KEY ("diretorId") REFERENCES "Membro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembroSetor" ADD CONSTRAINT "MembroSetor_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembroSetor" ADD CONSTRAINT "MembroSetor_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escala" ADD CONSTRAINT "Escala_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalaItem" ADD CONSTRAINT "EscalaItem_escalaId_fkey" FOREIGN KEY ("escalaId") REFERENCES "Escala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalaItem" ADD CONSTRAINT "EscalaItem_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
