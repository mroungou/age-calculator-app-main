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

function validDay(day) {
    const day = parseInt(document.getElementById('day').value);
    const month = document.getElementById('month');
    if (day === ' ' ) {
        setError(day, validationMessage.empty.replace(':attribute', 'day'));
    } else if ( day > monthsOfYear[month]) {
        setError(day, validationMessage.day)
    }
}

function validMonth (month) {
    const month = parseInt(document.getElementById('month').value);
    if (month === ' ' ) {
        setError(month, validationMessage.empty.replace(':attribute', 'month'));
    } else if (month > 12) {
        setError(month, validationMessage.empty.replace('attribute', 'month'));
    }
}

function validYear (year) {
    const year = parseInt(document.getElementById('year').value);
    const currentYear = new Date().getFullYear();
    if (year === ' ') {
        setError(year, validationMessage.empty.replace(':attribute', 'year'));
    } else if (year > currentYear) {
        setError(year, validationMessage.year)
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

        calculateAge();
    })
})