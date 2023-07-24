import request from "supertest";
import { User } from "../../../../core/domain/models/user";
import App from "../../../../app/showwcase";
const a = new App();
const aa = a.app;
const existingUser: User = { email: "mock@mail.com", password: "000" };
const newUser: User = { email: "mock_new@mail.com", password: "000" };
const infiniteToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vY2tAbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR4aEZ6cFZMUUc5bmZER0M1b3BheXZ1UzNpLzFCcERZd1BZekNsRHFKYXhVSThKWnJ2S2RJdSIsImlhdCI6MTY5MDE5NzIxMywiZXhwIjoxNjkwNzczMjEzfQ.GcZNT8lYJWl1LJ9rsinrT_3soozDCS5r1ZGqwII6kTI";

describe("POST /api/auth/register", () => {
  it("should NOT register an existing user", async () => {
    const response = await request(aa)
      .post("/api/auth/register")
      .send(existingUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error", "User already exists");
  });
});

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const response = await request(aa).post("/api/auth/register").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "success");
  });
});

describe("POST /api/auth/login", () => {
  it("should login an existing user", async () => {
    const response = await request(aa)
      .post("/api/auth/login")
      .send(existingUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "login success");
    expect(response.body).toHaveProperty("token");
  });
});

describe("POST /api/auth/login", () => {
  it("should NOT login a new user", async () => {
    const response = await request(aa).post("/api/auth/login").send(newUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "error",
      `User ${newUser.email} not found in database`
    );
  });
});

describe("POST /api/auth/profile", () => {
  it("should NOT return the profile of a logged out user", async () => {
    const response = await request(aa)
      .post("/api/auth/profile")
      .send(existingUser)
      .set("Authorization", infiniteToken);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "error",
      "Unauthorised. Token missing"
    );
  });
});
