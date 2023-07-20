// object representing the number of days in each month
// 1 === Jan, 2 === Feb, 3 === March ....
const monthsOfYear = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
};

const validationMessage = {
    'empty': 'Must be a valid :attribute',
    'day': 'Must be a valid date',
    'year': 'Must be in the past'
}

function calculateAge() {
    
}

function validDay() {
    const day = parseInt(document.getElementById('day').value);
    const month = document.getElementById('month');

    const dayInput = document.getElementById('day');
    if (isNaN(day)) {
        setError(dayInput, validationMessage.empty.replace(':attribute', 'day'));
    } else if ( day > monthsOfYear[month]) {
        setError(dayInput, validationMessage.day)
    }
}

function validMonth () {
    const month = parseInt(document.getElementById('month').value);

    const monthInput = document.getElementById('month');
    if (isNaN(month)) {
        setError(monthInput, validationMessage.empty.replace(':attribute', 'month'));
    } else if (month > 12 || month < 1) {
        setError(monthInput, validationMessage.empty.replace('attribute', 'month'));
    }
}

function validYear () {
    const year = parseInt(document.getElementById('year').value);
    const currentYear = new Date().getFullYear();

    const yearInput = document.getElementById('year');
    if (isNaN(year)) {
        setError(yearInput, validationMessage.empty.replace(':attribute', 'year'));
    } else if (year > currentYear) {
        setError(yearInput, validationMessage.year)
    }
}

function setError(element, message) {
    const inputField = element.parentElement;
    const displayError = inputField.querySelector('.error');

    displayError.innerText = message;
    inputField.classList.add('has-error');
    inputField.classList.remove('not-error');
}




window.addEventListener('DOMContentLoaded', function() {
    const form = this.document.getElementById('age-calculator');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        validDay();
        validMonth();
        validYear();
        
        calculateAge();
    })
})