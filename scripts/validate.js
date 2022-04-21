const editProfile = document.forms.editProfile;
const newCard = document.forms.newCard;

const enableButton = (button, inactiveButtonClass) =>{
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
}

const disableButton = (button, inactiveButtonClass) =>{
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
}

const setButtonState = (button, isValid) =>{
    if(isValid){
        enableButton(button,'popup__submit_invalid')
    }
    else{
        disableButton(button,'popup__submit_invalid')   
    }
}



const validateInput = (input) =>{
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);

    errorElement.textContent = input.validationMessage;
}

const handleInput = (event) =>{
    const currentForm = event.currentTarget;
    const input = event.target;
    const submitButton= currentForm.querySelector('.submit');
    validateInput(input);
    setButtonState(submitButton,currentForm.checkValidity())
}


const handleSubmit = (event) =>{

    const currentForm = event.target;
event.preventDefault();
if (currentForm.checkValidity()){
    currentForm.reset();
}
}

editProfile.addEventListener('submit', handleSubmit);
newCard.addEventListener('submit', handleSubmit);

editProfile.addEventListener('input', handleInput);
newCard.addEventListener('input', handleInput);
