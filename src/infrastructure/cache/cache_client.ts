import redis, { createClient } from "redis";
// 🚨 Only a mock for now. No implementation at all
// This is the Redis client instance. It returns a connected intance of redis
export function createRedisClient(): ReturnType<typeof createClient> {
  // Replace the host and port with your Redis server configuration
  const client = createClient();

  client.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });

  client.on("ready", () => {
    console.log("Redis client connected!");
  });

  return client;
}
