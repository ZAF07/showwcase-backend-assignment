export type User = { email: string; password?: string };
export type RandomUser = { firstName: string; age: number };

import { Model, Column, Table } from "sequelize-typescript";

@Table({ tableName: "users" })
class UserModel extends Model {
  @Column({ allowNull: false })
  email!: string;

  @Column({ allowNull: false })
  password!: string;
}

export { UserModel };
