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
          ((data.oneMonth && !data.threeMonths && !data.sixMonths) ||
            (!data.oneMonth && data.threeMonths && !data.sixMonths) ||
            (!data.oneMonth && !data.threeMonths && data.sixMonths))) ||
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
      typeof data.oneMonth === "boolean" &&
      typeof data.threeMonths === "boolean" &&
      typeof data.sixMonths === "boolean" &&
      typeof data.disable === "boolean"
    );
  });

export type animalRegisterType = z.infer<typeof animalRegisterSchema>;
function refine(arg0: (data: any) => boolean) {
  throw new Error("Function not implemented.");
}
