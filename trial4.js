document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const inpute = document.querySelectorAll('input');
    const textCol = document.querySelectorAll('label');
    let inputYY = '';
    let inputMM = '';
    let inputDD = '';

    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');

    const todayDate = new Date();

    updateAgeContent();

    [inputD, inputM, inputY].forEach(input => {
        input.addEventListener('input', () => {
            localStorage.clear();
        });
    });

    function updateAgeContent() {
        const date = document.querySelector('#dy');
        const month = document.querySelector('#mnth');
        const year = document.querySelector('#yr');

        if (!localStorage.getItem('ageDays') || !localStorage.getItem('ageMonths') || !localStorage.getItem('ageYears')) {
            date.textContent = '--';
            month.textContent = '--';
            year.textContent = '--';
        } else {
            date.textContent = localStorage.getItem('ageDays');
            month.textContent = localStorage.getItem('ageMonths');
            year.textContent = localStorage.getItem('ageYears');
        }
    }

    /*function toggleClass(hasError) {
        inpute.forEach(input => {
            input.classList.toggle('input', !hasError);
            input.classList.toggle('inputError', hasError);
        });
    }*/

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
        inputDD = parseInt(inputD.value);
        inputMM = parseInt(inputM.value);
        inputYY = parseInt(inputY.value);

        const dd = todayDate.getDate();
        const mm = todayDate.getMonth() + 1;
        const yy = todayDate.getFullYear();

        const invalid = document.querySelector('#invalid');
        const invalides = document.querySelector('#invalides');
        const invalider = document.querySelector('#invalider');
                 
        function isValidInput(inputDD,inputMM,inputYY) {
            
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
                return;
            }

            if (isInvalidDate) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                return;
            }

            if (inputMM == 2 && inputDD > 28) {
                invalid.textContent = "Must be a valid date";
                return;
            }

            if ((inputMM == 4 || inputMM == 6 || inputMM == 9 || inputMM == 11) && inputDD > 30) {
                invalid.textContent = "Must be a valid date";
                return;
            }

            if (inputYY < yy) {
                invalider.textContent = "Must be a valid date";
                return;
            }

            if (inputYY == yy && inputMM < mm) {
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                return;
            }

            if (inputYY == yy && inputMM == mm && inputDD < dd) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                return;
            }


            changeBorderColor();
            changeTextColor();
            updateAgeContent();

            if (!isInputValid) {
                return;
            }

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

            if (inputDD <= dd && inputMM == mm && inputYY >= yy){
                ageYears = 0;
                ageMonths = 0;
            }

            localStorage.setItem('ageDays', ageDays);
            localStorage.setItem('ageMonths', ageMonths);
            localStorage.setItem('ageYears', ageYears);

            localStorage.setItem('inputDD', inputDD);
            localStorage.setItem('inputMM', inputMM);
            localStorage.setItem('inputYY', inputYY);

            updateAgeContent();
        }

        isValidInput();
    });
});
