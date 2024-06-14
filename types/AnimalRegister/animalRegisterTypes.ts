import { z } from "zod";

export const animalRegisterSchema = z
  .object({
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
    oneMonth: z.boolean(),
    threeMonths: z.boolean(),
    sixMonths: z.boolean(),

    about: z.string().optional(),
    disable: z.boolean(),
  })
  .refine(
    (data) => {
      return (
        (data.sick && data.sickness !== "") ||
        (!data.sick && data.sickness === "")
      );
    },
    { message: "Sickness inválido", path: ["sickness"] },
  )
  .refine(
    (data) => {
      return (
        (data.acompanyBeforeAdoption &&
          (data.oneMonth || data.threeMonths || data.sixMonths)) ||
        (!data.acompanyBeforeAdoption &&
          !data.oneMonth &&
          !data.threeMonths &&
          !data.sixMonths)
      );
    },
    {
      message: "Month Information inválido",
      path: ["oneMonth", "threeMonths", "sixMonths"],
    },
  );

export type animalRegisterType = z.infer<typeof animalRegisterSchema>;
