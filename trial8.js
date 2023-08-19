document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');

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
    
        const todayDate = new Date();
        const yy = todayDate.getFullYear();
    
        const invalid = document.querySelector('#invalid');
        const invalides = document.querySelector('#invalides');
        const invalider = document.querySelector('#invalider');
    
        function showErrorMessages(dayMessage, monthMessage, yearMessage) {
            invalid.textContent = dayMessage;
            invalides.textContent = monthMessage;
            invalider.textContent = yearMessage;
        }

        function clearErrorMessages() {
            invalid.textContent = '';
            invalides.textContent = '';
            invalider.textContent = '';
        }
    
        function isValidDate(day, month, year) {
            const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
            return (
                day >= 1 && day <= daysInMonth[month] + (month === 2 && isLeapYear) &&
                month >= 1 && month <= 12 &&
                year >= 1800 && year <= yy
            );
        }
    
        function calculateAge(date) {
            const diff = todayDate - date;
            const ageDate = new Date(diff);
    
            return {
                years: ageDate.getUTCFullYear() - 1970,
                months: ageDate.getUTCMonth(),
                days: ageDate.getUTCDate() - 1
            };
        }

        const isDDRequired = !inputDD;
        const isMMRequired = !inputMM;
        const isYYRequired = !inputYY;

        if (isDDRequired || isMMRequired || isYYRequired) {
            showErrorMessages(
                isDDRequired ? "This field is required" : "",
                isMMRequired ? "This field is required" : "",
                isYYRequired ? "This field is required" : ""
            );
            changeBorderColor(false);
            changeTextColor(false);
        } else if (!isValidDate(inputDD, inputMM, inputYY)) {
            showErrorMessages(
                inputDD < 1 || inputDD > 31 ? "Must be a valid day" : "",
                inputMM < 1 || inputMM > 12 ? "Must be a valid month" : "",
                inputYY < 1800 || inputYY > yy ? "Must be a valid year" : ""
            );

        // Additional error messages for specific months
            if ([2].includes(inputMM)) {
                showErrorMessages(
                    
                    inputMM === 2 && inputDD > 28 ? "Must be a valid date" : "",
                    "","",
                );
            }
            if ([4].includes(inputMM)) {
                showErrorMessages(
                    
                    inputMM === 4 && inputDD > 30 ? "Must be a valid date" : "",
                    "","",
            )}

            if ([6].includes(inputMM)) {
                showErrorMessages(
                    
                    inputMM === 6 && inputDD > 30 ? "Must be a valid date" : "",
                    "","",
            )}
            if ([9].includes(inputMM)) {
                showErrorMessages(
                
                    inputMM === 9 && inputDD > 30 ? "Must be a valid date" : "",
                    "","",
            )}

            if ([11].includes(inputMM)) {
                showErrorMessages(
        
                    inputMM === 11 && inputDD > 30 ? "Must be a valid date" : "",
                    "", "",
            )}

            changeBorderColor(false);
            changeTextColor(false);
        } else {
            clearErrorMessages();

            changeBorderColor(true);
            changeTextColor(true);

            const inputDate = new Date(inputYY, inputMM - 1, inputDD);
            const age = calculateAge(inputDate);

            localStorage.setItem('ageDays', age.days);
            localStorage.setItem('ageMonths', age.months);
            localStorage.setItem('ageYears', age.years);

            localStorage.setItem('inputDD', inputDD);
            localStorage.setItem('inputMM', inputMM);
            localStorage.setItem('inputYY', inputYY);

            updateAgeContent();
        }
    });
});





 /*const isRequired = !inputDD || !inputMM || !inputYY;
        const isReq1 = !inputDD;
        const isReq2 = !inputMM;
        const isReq3 = !inputYY;
        const isInvalidDate = !isValidDate(inputDD, inputMM, inputYY);
        const isInvalid1 = isInvalidDate.getUTCDate();
        const isInvalid2 = isInvalidDate.getUTCMonth();
        const isInvalid3 = isInvalidDate.getUTCFullYear();

    
        if (isRequired) {
            showErrorMessages("This field is required", "This field is required", "This field is required");
            changeBorderColor(false);
            changeTextColor(false);
        
         if (!isReq1){
            showErrorMessages("Must be a valid day", "", "");
            changeBorderColor(false);
            changeTextColor(false);
            }
         if (!isReq2) {
            showErrorMessages("", "Must be a valid month", "");
            changeBorderColor(false);
            changeTextColor(false);
            }
         if (!isReq3) {
            showErrorMessages("", "Must be a valid month", "");
            changeBorderColor(false);
            changeTextColor(false);
            }
        }
        else if (isInvalidDate) {
            showErrorMessages("Must be a valid day", "Must be a valid month", "Must be a valid year");
            changeBorderColor(false);
            changeTextColor(false);
        
            if (isInvalid1) {
            showErrorMessages("Must be a valid day", "", "");
            changeBorderColor(false);
            changeTextColor(false);
            }
            if (isInvalid2) {
            showErrorMessages("", "Must be a valid month", "");
            changeBorderColor(false);
            changeTextColor(false);
            }
            if (isInvalid3) {
            showErrorMessages("", "", "Must be a valid year");
            changeBorderColor(false);
            changeTextColor(false);
            }
        }*/