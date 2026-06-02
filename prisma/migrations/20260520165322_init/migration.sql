/*
  Warnings:

  - You are about to drop the column `senha` on the `Membro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membro" DROP COLUMN "senha";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "membroId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_membroId_key" ON "User"("membroId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_membroId_fkey" FOREIGN KEY ("membroId") REFERENCES "Membro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
