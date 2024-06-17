import { userSchema } from "../../schemas/UserRegister/userRegister";

describe("User Schema", () => {
  it("all should be valid", () => {
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
      photo: "Test",
    });
    expect(res.success).toBe(true);
  });

  it("name should not be blank", () => {
    const res = userSchema.safeParse({
      name: "",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("age should be invalid", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("email should not be blank", () => {
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

  it("email should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "testegmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("state should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("city should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("adress should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "",
      phone: "99999999999",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("phone should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("phone should be invalid", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "9",
      user: "Test",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("user should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "",
      password: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("password should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      adress: "Test",
      phone: "99999999999",
      user: "Test",
      password: "",
    });
    expect(res.success).toBe(false);
  });
});
