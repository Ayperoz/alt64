import { Logger } from "@nestjs/common";
import { Redis } from "ioredis";

export class RedisService {

    private client: Redis;

    constructor() {
        this.client = new Redis(
           process.env.REDIS_URI
        );
    }

    async set(key: string, value: string): Promise<void> {
        // Defina o valor da chave no Redis
        await this.client.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        // Obtenha o valor associado à chave no Redis
        return await this.client.get(key);
    }

    async del(key: string): Promise<number> {
        // Exclua a chave do Redis e retorne o número de chaves excluídas
        return await this.client.del(key);
    }

    async keys(pattern: string): Promise<string[]> {
        // Obtenha as chaves que correspondem ao padrão fornecido
        return await this.client.keys(pattern);
    }

    async quit(): Promise<void> {
        // Encerre a conexão com o Redis
        await this.client.quit();
    }
}