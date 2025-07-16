/*
  Warnings:

  - A unique constraint covering the columns `[idEmpresaMult100]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_idEmpresaMult100_key" ON "company"("idEmpresaMult100");
