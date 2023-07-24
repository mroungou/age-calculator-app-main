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
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const monthCalc = document.getElementById('months-output');
    const yearCalc = document.getElementById('year-output');
    const daysCalc = document.getElementById('days-output');

    const birthDate = new Date(year, month, day);
    const currentDate = new Date();

    let ageMilliSeconds = currentDate - birthDate;
    let ageDate = new Date(ageMilliSeconds);

    let ageYears = ageDate.getUTCFullYear() - 1970;
    let ageMonths = ageDate.getUTCMonth();
    let ageDays = ageDate.getUTCDate() - 1;

    // need to adjust the age if the birthday hasn't occured yet

    if ((currentDate.getMonth() < birthDate.getMonth())||
        (currentDate.getMonth() === birthDate.getMonth() && 
        currentDate.getDate() < birthDate.getDate())) {
            ageYears -- ;
            if (currentDate.getMonth() < birthDate.getMonth()) {
                ageMonths += 12;
            }
    }

    // checking if the current date has fewer days than the birthdate in the birth month
    const daysInBirthMonth = new Date(year, month, 0).getDate();
    if (currentDate.getDate() < birthDate.getDate()) {
        ageMonths --;
        ageDays += daysInBirthMonth;
    }
    
    // adjusting days and months if they are negative
    if (ageMonths < 0) {
        ageMonths += 12;
    }

    if (ageDays < 0 ) {
        const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        ageDays += daysInPreviousMonth;
        ageMonths -- ;
    }

    
    yearCalc.innerHTML = ageYears;
    monthCalc.innerHTML = ageMonths;
    daysCalc.innerHTML = ageDays;
}

function validDay() {
    const day = parseInt(document.getElementById('day').value);
    const monthInput = parseInt(document.getElementById('month').value);

    const dayInput = document.getElementById('day');
    if (isNaN(day)) {
        setError(dayInput, validationMessage.empty.replace(':attribute', 'day'));
    } else if ( day > monthsOfYear[monthInput]) {
        setError(dayInput, validationMessage.day)
    } else {
        setSuccess(dayInput);
        return;
    }
}

function validMonth () {
    const month = parseInt(document.getElementById('month').value);

    const monthInput = document.getElementById('month');
    if (isNaN(month)) {
        setError(monthInput, validationMessage.empty.replace(':attribute', 'month'));
    } else if (month > 12 || month < 1) {
        setError(monthInput, validationMessage.empty.replace(':attribute', 'month'));
    } else {
        setSuccess(monthInput)
        return;
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
    } else if (year < 0) {
        setError(yearInput, validationMessage.empty.replace(':attribute', 'year'))
    } else {
        setSuccess(yearInput)
        return;
    }
}



function setError(element, message) {
    const inputField = element.parentElement;
    const displayError = inputField.querySelector('.error');

    displayError.innerText = message;
    inputField.classList.add('has-error');
    inputField.classList.remove('success');
}

function setSuccess(element) {
    const inputField = element.parentElement;
    const displayError = inputField.querySelector('.error');

    displayError.innerText = ' ';
    inputField.classList.remove('has-error');
    inputField.classList.add('success');
}




window.addEventListener('DOMContentLoaded', function() {
    const form = this.document.getElementById('age-calculator');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        validMonth();
        validDay();
        validYear();
        
        calculateAge();
    })
})