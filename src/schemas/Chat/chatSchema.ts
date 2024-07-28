import { z } from "zod";
import { IMessage } from "react-native-gifted-chat";

export const userSchema = z.object({
  _id: z.string().or(z.number()),
  name: z.string().optional(),
  avatar: z.string().or(z.number()).optional(),
});
export const replySchema = z.object({
  title: z.string(),
  value: z.string(),
  messageId: z.any().optional(),
});
export const quickReplySchema = z.object({
  type: z.enum(["radio", "checkbox"]),
  values: z.array(replySchema),
  keepIt: z.boolean().optional(),
});

export const messageSchema = z.object({
  _id: z.string().or(z.number()),
  text: z.string(),
  createdAt: z.date().or(z.number()),
  user: userSchema,
  image: z.string().optional(),
  video: z.string().optional(),
  audio: z.string().optional(),
  system: z.boolean().optional(),
  sent: z.boolean().optional(),
  received: z.boolean().optional(),
  pending: z.boolean().optional(),
  quickReplies: quickReplySchema.optional(),
});
// const MySchema = z.whatever() satisfies z.ZodType<IMessage>;
export const roomSchema = z.object({
  id: z.string().or(z.number()),
  members: z.array(z.string()),
  pet: z.string(),
  messages: z.array(messageSchema),

  createdAt: z.coerce.string().datetime(),
  updatedAt: z.coerce.string().datetime(),
});
export type Message = z.infer<typeof messageSchema>;
export type Room = z.infer<typeof roomSchema>;
