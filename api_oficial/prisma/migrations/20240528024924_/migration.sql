/*
  Warnings:

  - The values [contact] on the enum `typeMessage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "typeMessage_new" AS ENUM ('text', 'reaction', 'audio', 'document', 'image', 'sticker', 'video', 'location', 'contacts', 'interactive', 'template');
ALTER TABLE "sendMessageWhatsApp" ALTER COLUMN "type" TYPE "typeMessage_new" USING ("type"::text::"typeMessage_new");
ALTER TYPE "typeMessage" RENAME TO "typeMessage_old";
ALTER TYPE "typeMessage_new" RENAME TO "typeMessage";
DROP TYPE "typeMessage_old";
COMMIT;
