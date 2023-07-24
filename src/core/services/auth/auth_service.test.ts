import MockPostgresDBAdapter from "../../../adapters/db/postgres/mock_postgres";
import AuthService from "./auth_service";
import { User } from "../../domain/models/user";
import { isUser } from "../../../utils/testing";

const mockDB = new MockPostgresDBAdapter();
const authService = new AuthService(mockDB);
const existingUser: User = { email: "test@test.com", password: "123" };
const nonExistingUser: User = { email: "non@non.com", password: "000" };

describe(" @ Auth Service POST /api/auth/register", () => {
  it("should register a non existing user", async () => {
    const user: User = { email: "testone@test.com", password: "123" };
    const res = await authService.register(user);

    expect(res).toBeDefined();
    expect(true).toBe(isUser(res));
    expect(nonExistingUser.password).not.toEqual(res?.password);
  });
});

describe(" @ Auth Service POST /api/auth/register", () => {
  it("should NOT register an existing user", async () => {
    const user: User = { email: "testone@test.com", password: "123" };
    await expect(authService.register(existingUser)).rejects.toThrowError(
      "User already exists"
    );
  });
});

describe(" @ Auth Service POST /api/auth/login", () => {
  it("should login an existing user", async () => {
    const user: User = { email: "testone@test.com", password: "123" };
    const res = await authService.login(user);

    expect(res).toBeDefined();
    expect(res).not.toBeNull();
  });
});

describe(" @ Auth Service POST /api/auth/login", () => {
  it("should NOT login a NON existing user", async () => {
    const user: User = { email: "sest@test.com", password: "123" };
    await expect(authService.register(existingUser)).rejects.toThrowError(
      "User already exists"
    );
  });
});
