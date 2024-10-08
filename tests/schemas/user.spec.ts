import { userSchema } from "../../src/schemas/UserRegister/userRegister";

describe("User Schema", () => {
  it("all should be valid", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Teste123",
      photo: "phototest",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
    });
    expect(res.success).toBe(false);
  });

  it("address should not be blank", () => {
    const res = userSchema.safeParse({
      name: "Test",
      age: "20",
      email: "test@gmail.com",
      state: "Test",
      city: "Test",
      address: "",
      phone: "99999999999",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "9",
      user: "Test",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "",
      password: "Test",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
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
      address: "Test",
      phone: "99999999999",
      user: "Test",
      password: "",
      uid: "uidtest",
      notification_token: "token",
      adoptedPets: [],
    });
    expect(res.success).toBe(false);
  });
});
