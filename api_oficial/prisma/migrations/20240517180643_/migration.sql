-- CreateEnum
CREATE TYPE "typeMessage" AS ENUM ('text', 'reaction', 'audio', 'document', 'image', 'sticker', 'video', 'location', 'contact', 'interactive');

-- CreateTable
CREATE TABLE "sendMessageWhatsApp" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "type" "typeMessage" NOT NULL,
    "text" JSONB,
    "reaction" JSONB,
    "audio" JSONB,
    "document" JSONB,
    "image" JSONB,
    "sticker" JSONB,
    "video" JSONB,
    "location" JSONB,
    "contacts" JSONB,
    "interactive" JSONB,
    "enviada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sendMessageWhatsApp_pkey" PRIMARY KEY ("id")
);
