/*
  Warnings:

  - Added the required column `bussines_id` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number_id` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `send_token` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waba_id` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "whatsappOficial" ADD COLUMN     "bussines_id" TEXT NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "phone_number_id" TEXT NOT NULL,
ADD COLUMN     "send_token" TEXT NOT NULL,
ADD COLUMN     "waba_id" TEXT NOT NULL;
