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

  about: z.string().optional(),
  disable: z.boolean(),

  availableToAdoption: z.boolean(),
  ownerId: z.string().optional(),
  ownerCityState: z.string().optional(),
  interesteds: z.array(z.object({
    userId: z.string(),
    isAlreadyInChat: z.boolean(),
  })).optional(),
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
  })
  .transform((data) => {
    const optionsToStringObject = {
      "temperamento": {
        playfull: "Brincalhão",
        shy: "Tímido",
        calm: "Calmo",
        guard: "Guarda",
        lovely: "Amoroso",
        lazy: "Preguiçoso"
      },
      "exigências do doador": {
        adoptionTerm: "Termo de adoção",
        homePhotos: "Fotos da casa",
        previousVisit: "Visita prévia ao animal",
        acompanyBeforeAdoption: "Acompanhamento pós adoção"
      },
    }

    const mappedOptions: any = {};
    Object.entries(optionsToStringObject).forEach(([key, propStringMap]) => {
      const values: string[] = [];
      Object.entries(propStringMap).forEach(([input, text]) => {
        if (data[input as keyof typeof propStringMap]) {
          values.push(text);
          delete data[input as keyof typeof propStringMap]
        }
      })
      if (values.length > 0) {
        mappedOptions[key] = values.join(", ");
      }
    })

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        if (value) {
          mappedOptions[key] = "Sim"
        } else {
          mappedOptions[key] = "Não"
        }
      }
    })

    return {
      ...data,
      ...mappedOptions,
    }
  });

export type PetRegisterType = z.infer<typeof PetSchema>;
function refine(arg0: (data: any) => boolean) {
  throw new Error("Function not implemented.");
}
