/*
  Warnings:

  - You are about to drop the column `idEmpresaMult100` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `token_mult100` on the `whatsappOficial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_mult100]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token_mult100` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "company_idEmpresaMult100_key";

-- DropIndex
DROP INDEX "whatsappOficial_token_mult100_key";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "idEmpresaMult100",
ADD COLUMN     "token_mult100" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "whatsappOficial" DROP COLUMN "token_mult100";

-- CreateIndex
CREATE UNIQUE INDEX "company_token_mult100_key" ON "company"("token_mult100");
