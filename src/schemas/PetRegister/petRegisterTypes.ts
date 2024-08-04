import { z } from "zod";

export const basePetSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  photo: z.string().optional(),
  species: z.enum(["Gato", "Cachorro"]),
  gender: z.enum(["Macho", "Fêmea"]),
  size: z.enum(["Pequeno", "Médio", "Grande"]),
  age: z.enum(["Filhote", "Adulto", "Idoso"]),

  playfull: z.boolean(),
  shy: z.boolean(),
  calm: z.boolean(),
  guard: z.boolean(),
  lovely: z.boolean(),
  lazy: z.boolean(),

  vaccinated: z.boolean(),
  dewormed: z.boolean(),
  castrated: z.boolean(),
  sick: z.boolean(),
  sickness: z.string(),

  adoptionTerm: z.boolean(),
  homePhotos: z.boolean(),
  previousVisit: z.boolean(),

  acompanyBeforeAdoption: z.boolean(),
  periodToAcompany: z.enum(["", "1 Mês", "3 Meses", "6 Meses"]),
  // oneMonth: z.boolean(),
  // threeMonths: z.boolean(),
  // sixMonths: z.boolean(),

  about: z.string().optional(),
  disable: z.boolean(),

  availableToAdoption: z.boolean(),
  userId: z.string().optional(),
});

export const PetSchema = basePetSchema
  .refine(
    (data) => {
      return (
        (data.sick && data.sickness !== "") ||
        (!data.sick && data.sickness === "")
      );
    },
    { message: "Sickness inválido", path: ["sickness"] }
  )
  .refine(
    (data) => {
      return (
        (data.acompanyBeforeAdoption && data.periodToAcompany !== "") ||
        (!data.acompanyBeforeAdoption && data.periodToAcompany === "")
      );
    },
    {
      message: "Month Information inválido",
      path: ["oneMonth", "threeMonths", "sixMonths"],
    }
  )
  .refine((data) => {
    return (
      typeof data.playfull === "boolean" &&
      typeof data.shy === "boolean" &&
      typeof data.calm === "boolean" &&
      typeof data.guard === "boolean" &&
      typeof data.lovely === "boolean" &&
      typeof data.lazy === "boolean" &&
      typeof data.vaccinated === "boolean" &&
      typeof data.dewormed === "boolean" &&
      typeof data.castrated === "boolean" &&
      typeof data.sick === "boolean" &&
      typeof data.adoptionTerm === "boolean" &&
      typeof data.homePhotos === "boolean" &&
      typeof data.previousVisit === "boolean" &&
      typeof data.acompanyBeforeAdoption === "boolean" &&
      typeof data.disable === "boolean"
    );
  });

export type PetRegisterType = z.infer<typeof PetSchema>;
function refine(arg0: (data: any) => boolean) {
  throw new Error("Function not implemented.");
}
