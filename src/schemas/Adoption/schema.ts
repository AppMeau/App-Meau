import { z } from "zod";
const pet = z.object({
    id: z.string(),
    name: z.string(),
})
const user = z.object({
    id: z.string(),
    name: z.string(),
    notifyToken: z.string(),
})
export const adoptionSchema = z.object({
    id: z.string(),
    adopter: user,
    currentOwner: user,
    pet: pet,
    status: z.enum(["pending", "accepted", "rejected"]),
}) 

export type adoption = z.infer<typeof adoptionSchema>
export type adoptionUser = z.infer<typeof user>
export type adoptionPet = z.infer<typeof user>