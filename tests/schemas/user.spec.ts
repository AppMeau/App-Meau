import { userSchema } from "../../schemas/UserRegister/userRegister";

describe("User Schema", () => {
  it("should be valid", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(true);
  });

  it("email should be invalid", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });
});
