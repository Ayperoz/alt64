/*
  Warnings:

  - A unique constraint covering the columns `[id_whatsapp_mult100]` on the table `whatsappOficial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_whatsapp_mult100` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "whatsappOficial" ADD COLUMN     "id_whatsapp_mult100" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "whatsappOficial_id_whatsapp_mult100_key" ON "whatsappOficial"("id_whatsapp_mult100");
