import { Pool, PoolClient } from "pg";
import { datastore } from "../../../types/types";

let pool: Pool;
export function connectToPostgres(conn: datastore): Promise<PoolClient> {
  if (!pool) {
    pool = new Pool({
      user: conn.user,
      host: conn.host,
      database: conn.name,
      password: conn.password,
      port: conn.port,
    });
  }

  const client = pool.connect();

  return client;
}
