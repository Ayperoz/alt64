/*
  Warnings:

  - Added the required column `whatsappOficialId` to the `sendMessageWhatsApp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sendMessageWhatsApp" ADD COLUMN     "whatsappOficialId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "sendMessageWhatsApp" ADD CONSTRAINT "sendMessageWhatsApp_whatsappOficialId_fkey" FOREIGN KEY ("whatsappOficialId") REFERENCES "whatsappOficial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
