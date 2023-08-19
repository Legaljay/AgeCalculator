/*document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const date = document.querySelector('#dy');
    const month = document.querySelector('#mnth');
    const year = document.querySelector('#yr');
    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');

    const todayDate = new Date();

    [inputD, inputM, inputY].forEach(input => {
        input.value = localStorage.getItem(`input${input.id}`);
    });

    function validateInput(input, errorMessage) {
        if (!input.value) {
            errorMessage.textContent = 'This field is required';
            return false;
        }
        errorMessage.textContent = '';
        return true;
    }

    function updateAgeContent() {
        date.textContent = localStorage.getItem('ageDays') || '--';
        month.textContent = localStorage.getItem('ageMonths') || '--';
        year.textContent = localStorage.getItem('ageYears') || '--';
    }

    function calculateAge(ageDays, ageMonths, ageYears) {
        if (ageMonths <= 0) {
            ageYears--;
            ageMonths += 12;
        }

        if (ageDays < 0) {
            const daysInLastMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
            ageDays += daysInLastMonth;
            ageMonths--;
        }

        localStorage.setItem('ageDays', ageDays);
        localStorage.setItem('ageMonths', ageMonths);
        localStorage.setItem('ageYears', ageYears);

        localStorage.setItem('inputDD', inputD.value);
        localStorage.setItem('inputMM', inputM.value);
        localStorage.setItem('inputYY', inputY.value);

        updateAgeContent();

        console.log(ageDays, ageMonths, ageYears);
    }

    button.addEventListener('click', () => {
        const inputDD = parseInt(inputD.value);
        const inputMM = parseInt(inputM.value);
        const inputYY = parseInt(inputY.value);

        const dd = todayDate.getDate();
        const mm = todayDate.getMonth() + 1;
        const yy = todayDate.getFullYear();

        const invalid = document.querySelector('#invalid');
        const invalides = document.querySelector('#invalides');
        const invalider = document.querySelector('#invalider');

        let hasError = false;

        hasError |= !validateInput(inputD, invalid);
        hasError |= !validateInput(inputM, invalides);
        hasError |= !validateInput(inputY, invalider);

        if (!hasError) {
            const ageYears = yy - inputYY;
            const ageMonths = mm - inputMM;
            const ageDays = dd - inputDD;

            calculateAge(ageDays, ageMonths, ageYears);
        }
    });
});
*/


function setErrorMessage(element, message) {
    element.textContent = message;
}

function validateInput(input, errorMessage, message) {
    if (!input.value || !input.value.trim()) {
        setErrorMessage(errorMessage, message);
        return false;
    }
    setErrorMessage(errorMessage, '');
    return true;
}

function validateDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');
    const invalid = document.querySelector('#invalid');
    const invalides = document.querySelector('#invalides');
    const invalider = document.querySelector('#invalider');
    const date = document.querySelector('#dy');
    const month = document.querySelector('#mnth');
    const year = document.querySelector('#yr');
    const inpute = document.querySelectorAll('input');
    const textCol = document.querySelectorAll('label');

    function changeBorderColor(valid) {
        inpute.forEach(input => {
            input.style.borderColor = valid ? 'initial' : 'red';
        });
    }

    function changeTextColor(valid) {
        textCol.forEach(label => {
            label.style.color = valid ? 'initial' : 'red';
        });
    }

    [inputD, inputM, inputY].forEach(input => {
        input.value = localStorage.getItem(`input${input.id}`);
    });

    button.addEventListener('click', () => {
        const inputDD = parseInt(inputD.value);
        const inputMM = parseInt(inputM.value);
        const inputYY = parseInt(inputY.value);

        const dd = new Date().getDate();
        const mm = new Date().getMonth() + 1;
        const yy = new Date().getFullYear();

        let hasError = false;

        hasError |= !validateInput(inputD, invalid, 'This field is required');
        hasError |= !validateInput(inputM, invalides, 'This field is required');
        hasError |= !validateInput(inputY, invalider, 'This field is required');

        if (!hasError) {
            if (!validateDate(inputDD, inputMM, inputYY)) {
                setErrorMessage(invalid, 'Must be a valid date');
                setErrorMessage(invalides, 'Must be a valid date');
                setErrorMessage(invalider, 'Must be a valid date');
                return;
            }

            if ((inputDD > dd || inputMM > mm) && inputYY > yy){
                setErrorMessage(invalid, 'Must be a valid date');
                setErrorMessage(invalides, 'Must be a valid date');
                setErrorMessage(invalider, 'Must be a valid date');
                return;
            }

            if((inputDD == dd && inputYY >= yy)||(inputMM == mm && inputYY >= yy)){
                setErrorMessage(invalid, 'Must be a valid date');
                setErrorMessage(invalides, 'Must be a valid date');
                setErrorMessage(invalider, 'Must be a valid date');
                return;
            }

            if (inputMM === 2 && inputDD > 28) {
                setErrorMessage(invalid, 'Must be a valid date');
                return;
            }

            if ((inputMM === 4 || inputMM === 6 || inputMM == 9 || inputMM == 11) && inputDD > 30) {
                setErrorMessage(invalid, 'Must be a valid date');
                return;
            }

            if (inputYY.toString().length !== 4 || inputYY < 1800) {
                setErrorMessage(invalider, 'Must be a valid date');
                return;
            }

            setErrorMessage(invalid, '');
            setErrorMessage(invalides, '');
            setErrorMessage(invalider, '');

            let ageYears = yy - inputYY;
            let ageMonths = mm - inputMM;
            let ageDays = dd - inputDD;

            if (ageMonths <= 0) {
                ageYears--;
                ageMonths += 12;
            }

            if (ageDays < 0) {
                const daysInLastMonth = new Date(yy, mm - 1, 0).getDate();
                ageDays += daysInLastMonth;
                ageMonths--;
            }

            localStorage.setItem('ageDays', ageDays);
            localStorage.setItem('ageMonths', ageMonths);
            localStorage.setItem('ageYears', ageYears);

            // localStorage.setItem('inputDD', inputDD);
            // localStorage.setItem('inputMM', inputMM);
            // localStorage.setItem('inputYY', inputYY);

            date.textContent = ageDays;
            month.textContent = ageMonths;
            year.textContent = ageYears;

            console.log(ageDays, ageMonths, ageYears);
        }
    });
});
