import { z } from "zod";

const emailFormat =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneFormat = /(?:\()?[0-9]{2}(?:\)?)\s?[0-9]{4,5}(-?|\s?)[0-9]{4}$/;

export const credentialSchema = z.object({
  email: z.string().regex(emailFormat, "Email Inválido").min(1),
  password: z.string().min(6),
});

export const userSchema = z.object({
  name: z.string().min(1),
  age: z.string().min(1),
  email: z.string().regex(emailFormat, "Email Inválido").min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().regex(phoneFormat, "Telefone Inválido").min(1),
  user: z.string().min(1),
  password: z.string().min(6),
  photo: z.string().optional(),
  uid: z.string(),
  notification_token: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type Credential = z.infer<typeof credentialSchema>;
