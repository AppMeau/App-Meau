import userRegisterType from "../../types/UserRegister/userRegister";

function validateUserRegister(userRegister: userRegisterType){
    const emailFormat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneFormat = /(?:\()?[0-9]{2}(?:\)?)\s?[0-9]{4,5}(-?|\s?)[0-9]{4}$/;

    if(userRegister.name === ""){
        throw new Error("Name Required");
    }

    if(userRegister.age === ""){
        throw new Error("Age Required");
    }

    if(userRegister.email === ""){
        throw new Error("Email Required");
    }

    if(!userRegister.email.match(emailFormat)){
        throw new Error("Invalid Email");
    }

    if(userRegister.state === ""){
        throw new Error("State Required");
    }

    if(userRegister.city === ""){
        throw new Error("City Required");
    }

    if(userRegister.adress === ""){
        throw new Error("Address Required");
    }

    if(userRegister.phone === ""){
        throw new Error("Phone Required");
    }

    if(!userRegister.phone.match(phoneFormat)){
        throw new Error("Invalid Phone");
    }

    if(userRegister.user === ""){
        throw new Error("User Required");
    }

    if(userRegister.password === ""){
        throw new Error("Password Required");
    }
    
}
export default validateUserRegister;