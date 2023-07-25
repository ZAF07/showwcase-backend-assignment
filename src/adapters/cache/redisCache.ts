// src/infrastructure/caching/RedisCache.ts
import { createClient } from "redis";
import { ICacheRepository } from "../../core/ports/cache_interface/cacheInterface";

// Implements the IRepository interface. connects to the service and talks to external dependencies (Redis)
export default class RedisCacheAdapter implements ICacheRepository {
  constructor(private client: ReturnType<typeof createClient>) {}

  public async findByUsername(id: string): Promise<string | null> {
    // 💡 Just a mock
    const foundUser = await this.client.get(id);
    if (!foundUser) {
      return null;
    }
    return "token string";
  }

  public add(token: string): boolean {
    return true;
  }
}
