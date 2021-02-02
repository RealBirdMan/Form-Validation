function getValidationElements(formId){
   let el; 

   try{
    const formContainer = document.getElementById(formId);
    el = formContainer.querySelectorAll("input")
   } catch(err){
       throw new Error("Couldn't find proper id")
   }

   return Array.from(el);
}

function validationSchema(inputVal, validationKey, validationVal){
   switch(validationKey){
       case "required":
           return inputVal.trim() !== "" 
       case "minLength":
          return inputVal.trim().length >= validationVal
       case "maxLength":
          return inputVal.trim().length <= validationVal 
   }
}

function validate(target, validationObj){
    if( typeof validationObj !== "object"){
        throw new Error("validationObj is not in correct format")
    }

    let isValid = true;
    for(let key in validationObj){
       const validation =  validationSchema(target.value, key, validationObj[key])
       isValid = validation && isValid
    }

    if(isValid){
        target.style = "border-color: green"
    } else {
        target.style = "border-color: red"
    }

}


const [firstName, lastName] = getValidationElements("form-one");
firstName.addEventListener("focusout", (e) => validate(e.target, {required: true, minLength: 5, maxLength:10}));
lastName.addEventListener("focusout", (e) => validate(e.target, {required: true, maxLength:5}));