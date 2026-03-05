/*
    Hudson Drozdowski
    Warren Macalino
    Prajita Sanyasi

    2026-03-05
    Hackathon 4
*/

const form = document.getElementById("jobApplicationForm")
 
form.addEventListener("submit", (event) => {
    
    clearErrorMessages()

    event.preventDefault()

    if (validateForm()){
        form.submit()
    }
    else{
        console.log("Validation Failed.")
    }
})

const validateForm = () => {
    let isValid = true
    
    if (!checkRadiosValid()){
        const codeLanguagesContainer = document.getElementById("codeLanguagesContainer")

        isValid = false
        addInputError(codeLanguagesContainer, "At least one language must be selected.")
    }

    const availabilityOption = document.getElementById('availability-type');
    const selectedAvailabilityOption = document.querySelector('input[name="availability-type"]:checked');

    if (!selectedAvailabilityOption) {
        addInputError(availabilityOption, "Please select an option.")
        isValid = false;
    }

    isValid = validateContactInformation()
    
    return isValid
}   

const validateContactInformation = () => {
    let isValid = true

    const contactEmailContainer = document.getElementById("contactEmailContainer")
    const email = document.getElementById("email")
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!emailPattern.test(email.value)) {
        addInputError(contactEmailContainer, "Email address is not valid")
        isValid = false
    }

    const contactPhoneContainer = document.getElementById("contactPhoneContainer")
    const phone = document.getElementById("phone-number")
    if (phone.value === ""){
        addInputError(contactPhoneContainer, "Please enter a Phone Number")
        isValid = false
    }
    
    const contactNameContainer = document.getElementById("contactNameContainer")
    const name = document.getElementById("name")
    if (name.value === ""){
        addInputError(contactNameContainer, "Please enter your Name")
        isValid = false
    }
    return isValid
}

const checkRadiosValid = () => {
    const radiosList = document.getElementsByClassName("languageSelection")
    let radioIsValid = false
    for (let radio of radiosList){
        if(radio.checked){
            radioIsValid = true
        }
    }
    
    return radioIsValid
}

const addInputError = (inputElement, message) => {
    const errorDisplay = document.createElement("span")
    errorDisplay.innerText = message
    errorDisplay.className = "error"
    errorDisplay.setAttribute("role", "alert")
    inputElement.appendChild(errorDisplay)
}

const clearErrorMessages = () => {
    const errorMessages = document.querySelectorAll(".error")
    for (const error of errorMessages){
        error.remove()
    }
}