import { User } from "../../core/domain/models/user";
export const isUser = (obj: any): obj is User => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "email" in obj &&
    "password" in obj
  );
};
