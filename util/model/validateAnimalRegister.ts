import animalRegisterTypes from "../../types/AnimalRegister/animalRegisterTypes";

function validateAnimalRegister (animalRegister: animalRegisterTypes){
    if(animalRegister.name === ""){
        throw new Error("Name Required");
    }
    
    if(animalRegister.species !== "Gato" && animalRegister.species !== "Cachorro"){
        throw new Error("Invalid Specie");
    }

    if(animalRegister.gender !== "Macho" && animalRegister.gender !== "Fêmea"){
        throw new Error("Invalid Gender");
    }

    if(animalRegister.size !== "Pequeno" && animalRegister.size !== "Médio" && animalRegister.size !== "Grande"){
        throw new Error("Invalid Size");
    }

    if(animalRegister.age !== "Filhote" && animalRegister.age !== "Adulto" && animalRegister.age !== "Idoso"){
        throw new Error("Invalid Age");
    }

    if(animalRegister.sick && animalRegister.sickness === ""){
        throw new Error("Sickness Required");
    }

    if(animalRegister.sick === false && animalRegister.sickness !== ""){
        throw new Error("Fild Sick Required");
    }

    if(animalRegister.acompanyBeforeAdoption && animalRegister.oneMonth === false && animalRegister.threeMonths === false && animalRegister.sixMonths === false){
        throw new Error("Month Information Required");
    }

    if(animalRegister.acompanyBeforeAdoption === false && (animalRegister.oneMonth === true ||  animalRegister.threeMonths === true || animalRegister.sixMonths === true)){
        throw new Error("Field Acompany Before Adoption Required");
    }

    if(animalRegister.about === ""){
        throw new Error("About Required");
    }

}
export default validateAnimalRegister;