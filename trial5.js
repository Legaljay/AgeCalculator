document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');
    const todayDate = new Date();

    updateAgeContent();

    [inputD, inputM, inputY].forEach(input => {
        input.addEventListener('input', () => {
            changeBorderColor(true);
            changeTextColor(true);
        });
    });

    function updateAgeContent() {
        const date = document.querySelector('#dy');
        const month = document.querySelector('#mnth');
        const year = document.querySelector('#yr');

        const ageDays = localStorage.getItem('ageDays') || '--';
        const ageMonths = localStorage.getItem('ageMonths') || '--';
        const ageYears = localStorage.getItem('ageYears') || '--';

        date.textContent = ageDays;
        month.textContent = ageMonths;
        year.textContent = ageYears;
    }

    function changeBorderColor(valid) {
        const inpute = document.querySelectorAll('input');
        inpute.forEach(input => {
            input.style.borderColor = valid ? 'initial' : 'red';
        });
    }

    function changeTextColor(valid) {
        const textCol = document.querySelectorAll('label');
        textCol.forEach(label => {
            label.style.color = valid ? 'initial' : 'red';
        });
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

        function isValidInput() {
            const isRequired = (!inputDD || !inputMM || !inputYY);
            const isInvalidDate = (
                inputDD < 1 || inputDD > 31 ||
                inputMM < 1 || inputMM > 12 ||
                inputYY < 1800 || inputYY > yy
            );

            if (isRequired) {
                invalid.textContent = "This field is required";
                invalides.textContent = "This field is required";
                invalider.textContent = "This field is required";
                return false;
            }

            if (isInvalidDate) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                return false;
            }

            if (inputMM == 2 && inputDD > 28) {
                invalid.textContent = "Must be a valid date";
                return false;
            }

            if ((inputMM == 4 || inputMM == 6 || inputMM == 9 || inputMM == 11) && inputDD > 30) {
                invalid.textContent = "Must be a valid date";
                return false;
            }

            if (inputYY < yy) {
                invalider.textContent = "Must be a valid date";
                return false;
            }

            if (inputYY == yy && inputMM < mm) {
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                return false;
            }

            if (inputYY == yy && inputMM == mm && inputDD < dd) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                return false;
            }

            invalid.textContent = "";
            invalides.textContent = "";
            invalider.textContent = "";
            return true;
        }

        const isInputValid = isValidInput(); // Call the validation function

        if (!isInputValid) {
            changeBorderColor(false);
            changeTextColor(false);
            updateAgeContent(); // Update age content even if there are validation errors
            return;
        }

        changeBorderColor(true);
        changeTextColor(true);

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

        if (inputDD <= dd && inputMM == mm && inputYY >= yy) {
            ageYears = 0;
            ageMonths = 0;
        }

        localStorage.setItem('ageDays', ageDays);
        localStorage.setItem('ageMonths', ageMonths);
        localStorage.setItem('ageYears', ageYears);

        localStorage.setItem('inputDD', inputDD);
        localStorage.setItem('inputMM', inputMM);
        localStorage.setItem('inputYY', inputYY);

        updateAgeContent(); // Update age content after calculations
    });
});
