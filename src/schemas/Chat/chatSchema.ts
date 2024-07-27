import { z } from "zod";

export const messageSchema = z.object({
  content: z.string(),
  //id do usuario
  sender: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  // id da mensagem a qual esta é uma resposta
  response: z.string(),
  deleted: z.boolean(),
});

export const roomSchema = z.object({
  members: z.array(z.string()),
  pet: z.string(),
  messages: z.array(messageSchema),

  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
