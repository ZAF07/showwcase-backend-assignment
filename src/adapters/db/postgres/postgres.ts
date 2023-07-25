import { PoolClient } from "pg";
import { User } from "../../../core/domain/models/user";
import { IDatastoreInterface } from "../../../core/ports/datastore_interface/datastore_interface";
import { connectToPostgres } from "../../../infrastructure/db/postgres/postgres_conn";
import { datastore } from "../../../types/types";

export default class PostgresDBAdapter implements IDatastoreInterface {
  private client: PoolClient;
  constructor(config: datastore) {
    this.initDB(config);
  }

  private async initDB(conn: datastore) {
    const client = await connectToPostgres(conn);
    this.client = client;
  }

  public async getUser(e: string): Promise<User | null> {
    try {
      const selectQuery =
        "SELECT email, password FROM users WHERE email = $1 LIMIT 1";
      const values = [e];
      const res = await this.client.query(selectQuery, values);
      if (res.rows.length < 1) {
        return null;
      }
      const { email, password } = res.rows[0];
      return { email, password };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getProfile(e: string): Promise<User | null> {
    try {
      const selectQuery = "SELECT email FROM users WHERE email = $1 LIMIT  1";
      const values = [e];
      const res = await this.client.query(selectQuery, values);
      if (res.rowCount < 1) {
        return null;
      }

      const { email } = res.rows[0];
      return { email };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // DAOs should take in DTOs instead og models. However, in some cases, a model could work too if it is small enough
  public async createProfile(user: User): Promise<User | null> {
    const insertQuery =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING email";
    const values = [user.email, user.password];
    try {
      const res = await this.client.query(insertQuery, values);
      const email = res.rows[0];
      return { email };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
