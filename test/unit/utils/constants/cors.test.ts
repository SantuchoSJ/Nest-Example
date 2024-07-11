import { CORS } from "@utils/constants/cors";

describe("CORS Configuration", () => {
  it("should have the correct origin policy", () => {
    expect(CORS.origin).toBe(true);
  });

  it("should allow the correct methods", () => {
    const expectedMethods = "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS";
    expect(CORS.methods).toBe(expectedMethods);
  });

  it("should support credentials", () => {
    expect(CORS.credentials).toBe(true);
  });
});
