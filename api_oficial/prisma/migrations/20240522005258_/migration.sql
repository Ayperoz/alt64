/*
  Warnings:

  - Added the required column `to` to the `sendMessageWhatsApp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sendMessageWhatsApp" ADD COLUMN     "to" TEXT NOT NULL;
