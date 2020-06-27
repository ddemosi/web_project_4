//error messages

function showErrorMessage(input, {errorClass, inputErrorClass, ...rest}) {
    const error = document.querySelector('#' + input.id + "-error");
    error.textContent = input.validationMessage;

    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);
}

function hideErrorMessage(input, {errorClass, inputErrorClass, ...rest}) {
    const error = document.querySelector('#' + input.id + "-error");
    error.textContent = '';

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
}

//disable and enable button if inputs are valid

function toggleButtonState(inputs, button, {inactiveButtonClass, ...rest}) {
    const isValid = inputs.every(input => input.validity.valid);

    if (isValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    }
}

//Show/hide errors if input is valid
function checkInputValidity(input, form, rest) {
    if (input.validity.valid) {
        hideErrorMessage(input, form, rest);
    } else {
        showErrorMessage(input, form, rest);
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
    const forms = document.querySelectorAll(formSelector);
    //prevent all event defaults on the form
    forms.forEach((form) => {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();
        });
    //select active inputs
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, form, rest);
            toggleButtonState(inputs, button, rest);
        })
        
        })
    })
}

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    inactiveButtonClass: "form__save-button_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__error_visible"
})