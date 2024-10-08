import { PetSchema } from "../../src/schemas/PetRegister/petRegisterTypes";

describe("Animal Schema", () => {
  it("all should be valid", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(true);
  });

  it("name should not be blank", () => {
    const res = PetSchema.safeParse({
      name: "",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("species' value should not be outside the options", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Pássaro",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("gender's value should not be outside the options", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Teste",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("size's value should not be outside the options", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Enorme",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("age's value should not be outside the options", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Teste",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("playfull's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: "true",
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("shy's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: "true",
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("calm's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: "true",
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("guard's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: "true",
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("lovely's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: "true",
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("lazy's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: "true",
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("vaccinated's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: "true",
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("dewormed's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: "true",
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("castrated's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: "true",
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("sick's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: "true",
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("sickness should not be filled when sick is false", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: false,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("sickenss should be filled when sick is true", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("adoptionTerm's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: "true",
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("homePhotos' value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: "true",
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("previousVisit's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: "true",
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("acompanyBeforeAdoption's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: "true",
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("periodToAcompany should not be filled if acompanyBeforeAdoption is false", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: false,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("periodToAcompany should not be empty if acompanyBeforeAdoption is true", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "",
      about: "Test",
      disable: false,
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });

  it("playfull's value should not have type different than boolean", () => {
    const res = PetSchema.safeParse({
      name: "Test",
      photo: "Test",
      species: "Gato",
      gender: "Macho",
      size: "Pequeno",
      age: "Filhote",
      playfull: true,
      shy: true,
      calm: true,
      guard: true,
      lovely: true,
      lazy: true,
      vaccinated: true,
      dewormed: true,
      castrated: true,
      sick: true,
      sickness: "Test",
      adoptionTerm: true,
      homePhotos: true,
      previousVisit: true,
      acompanyBeforeAdoption: true,
      periodToAcompany: "1 Mês",
      about: "Test",
      disable: "false",
      availableToAdoption: true,
      ownerId: "Test",
    });
    expect(res.success).toBe(false);
  });
});
