import { Pool, PoolClient } from "pg";
import { User } from "../../../core/domain/models/user";
import { IDatastoreInterface } from "../../../core/ports/datastore_interface/datastore_interface";

export default class MockPostgresDBAdapter implements IDatastoreInterface {
  constructor() {}

  public async getUser(e: string): Promise<User | null> {
    try {
      return { email: "mock@mail.com", password: "000" };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getProfile(e: string): Promise<User | null> {
    try {
      return { email: "mock@mail.com", password: "000" };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async createProfile(user: User): Promise<User | null> {
    try {
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
