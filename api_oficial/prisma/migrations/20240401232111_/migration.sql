-- AlterTable
ALTER TABLE "whatsappOficial" ALTER COLUMN "rabbitmq_exchange" DROP NOT NULL,
ALTER COLUMN "rabbitmq_queue" DROP NOT NULL,
ALTER COLUMN "rabbitmq_routing_key" DROP NOT NULL;
