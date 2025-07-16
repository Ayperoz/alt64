/*
  Warnings:

  - You are about to drop the column `token_mult100` on the `company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idEmpresaMult100]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token_mult100]` on the table `whatsappOficial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idEmpresaMult100` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_mult100` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "company_token_mult100_key";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "token_mult100",
ADD COLUMN     "idEmpresaMult100" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "whatsappOficial" ADD COLUMN     "token_mult100" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_idEmpresaMult100_key" ON "company"("idEmpresaMult100");

-- CreateIndex
CREATE UNIQUE INDEX "whatsappOficial_token_mult100_key" ON "whatsappOficial"("token_mult100");
