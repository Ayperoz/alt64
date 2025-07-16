/*
  Warnings:

  - You are about to drop the column `id_whatsapp_mult100` on the `whatsappOficial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_mult100]` on the table `whatsappOficial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token_mult100` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "whatsappOficial_id_whatsapp_mult100_key";

-- AlterTable
ALTER TABLE "whatsappOficial" DROP COLUMN "id_whatsapp_mult100",
ADD COLUMN     "token_mult100" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "whatsappOficial_token_mult100_key" ON "whatsappOficial"("token_mult100");
