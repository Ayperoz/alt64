/*
  Warnings:

  - Added the required column `verify_token` to the `whatsappOficial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "whatsappOficial" ADD COLUMN     "verify_token" TEXT NOT NULL;
