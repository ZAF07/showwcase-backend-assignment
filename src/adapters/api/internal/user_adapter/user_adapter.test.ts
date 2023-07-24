// __tests__/app.test.ts
import request from "supertest";
// import app from "../../../../app/showwcase";
import App from "../../../../app/showwcase";
// import { mockUserService } from "../../../../core/services/user/user_service_mock";

describe("GET /api/user/random", () => {
  it("should return a random user", async () => {
    const a = new App();
    const aa = a.app;
    // mockUserService.fetchRamdonUser.mockResolvedValue({
    //   firstname: "MOCK USER",
    //   age: 1000,
    // });
    const response = await request(aa).get("/api/user/random");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("firstName", "MOCK USER");
    expect(response.body).toHaveProperty("age", 1000);
  });
});
