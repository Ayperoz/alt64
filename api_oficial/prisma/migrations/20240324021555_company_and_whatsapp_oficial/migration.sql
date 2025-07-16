-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whatsappOficial" (
    "id" SERIAL NOT NULL,
    "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "companyId" INTEGER NOT NULL,
    "verify_token" TEXT NOT NULL,
    "auth_token_chatwoot" TEXT NOT NULL,
    "n8n_webhook_url" TEXT NOT NULL,
    "chatwoot_webhook_url" TEXT NOT NULL,
    "crm_webhook_url" TEXT NOT NULL,
    "typebot_webhook_url" TEXT NOT NULL,
    "rabbitmq_exchange" TEXT NOT NULL,
    "rabbitmq_queue" TEXT NOT NULL,
    "rabbitmq_routing_key" TEXT NOT NULL,

    CONSTRAINT "whatsappOficial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "whatsappOficial" ADD CONSTRAINT "whatsappOficial_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
