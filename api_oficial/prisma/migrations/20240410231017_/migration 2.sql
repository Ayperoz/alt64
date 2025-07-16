/*
  Warnings:

  - Added the required column `idEmpresaMult100` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" ADD COLUMN     "idEmpresaMult100" INTEGER NOT NULL;
