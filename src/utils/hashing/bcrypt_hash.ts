import bcrypt from "bcrypt";

// const saltRounds = 10; // Number of salt rounds

// export async function hashPassword(password: string): Promise<string> {
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
//   } catch (error) {
//     throw new Error("Error while hashing password");
//   }
// }

// export default async function comparePasswords(
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> {
//   try {
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     return isMatch;
//   } catch (error) {
//     throw new Error("Error while comparing passwords");
//   }
// }

export default class BcryptHelper {
  public static saltRounds: number = 10;

  static async hashString(s: string) {
    try {
      const hashedPassword = await bcrypt.hash(s, BcryptHelper.saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error while hashing password");
    }
  }

  static async compareHash(s: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(s, hash);
      return isMatch;
    } catch (error) {
      throw new Error("Error while comparing passwords");
    }
  }
}
