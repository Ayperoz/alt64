-- AlterTable
ALTER TABLE "whatsappOficial" ADD COLUMN     "auth_token_crm" TEXT,
ADD COLUMN     "auth_token_n8n" TEXT,
ADD COLUMN     "auth_token_typebot" TEXT,
ALTER COLUMN "auth_token_chatwoot" DROP NOT NULL,
ALTER COLUMN "n8n_webhook_url" DROP NOT NULL,
ALTER COLUMN "chatwoot_webhook_url" DROP NOT NULL,
ALTER COLUMN "crm_webhook_url" DROP NOT NULL,
ALTER COLUMN "typebot_webhook_url" DROP NOT NULL;
