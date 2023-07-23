// src/infrastructure/caching/RedisCache.ts
import { createClient } from "redis";
import { ICacheRepository } from "../../core/ports/cache_interface/cacheInterface";
import { RandomUser } from "../../core/domain/models/user";

// Implements the IRepository interface. connects to the service and talks to external dependencies (Redis)
export default class RedisCacheAdapter implements ICacheRepository {
  constructor(private client: ReturnType<typeof createClient>) {}

  public async findByUsername(id: string): Promise<RandomUser | null> {
    // 💡 Just a mock
    const foundUser = await this.client.get(id);
    if (!foundUser) {
      return null;
    }

    const user: RandomUser = { firstName: "Zaffere", age: 31 };
    return user;
  }

  public add(token: string): boolean {
    return true;
  }
}
