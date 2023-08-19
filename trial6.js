document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');
    //const todayDate = new Date();

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
        //const dd = todayDate.getDate();
        //const mm = todayDate.getMonth() + 1;
        const yy = todayDate.getFullYear();
    
        const invalid = document.querySelector('#invalid');
        const invalides = document.querySelector('#invalides');
        const invalider = document.querySelector('#invalider');
    
        function showErrorMessages(mainMessage, esMessage, erMessage) {
            invalid.textContent = mainMessage;
            invalides.textContent = esMessage;
            invalider.textContent = erMessage;
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
    
        const inputDate = new Date(inputYY, inputMM - 1, inputDD);
        
        if (!isValidDate(inputDD, inputMM, inputYY)) {
            showErrorMessages("Must be a valid date", "Must be a valid date", "Must be a valid date");
            changeBorderColor(false);
            changeTextColor(false);
            updateAgeContent();
            return;
        }
    
        showErrorMessages("", "", "");
    
        changeBorderColor(true);
        changeTextColor(true);
    
        const age = calculateAge(inputDate);
    
        localStorage.setItem('ageDays', age.days);
        localStorage.setItem('ageMonths', age.months);
        localStorage.setItem('ageYears', age.years);
    
        localStorage.setItem('inputDD', inputDD);
        localStorage.setItem('inputMM', inputMM);
        localStorage.setItem('inputYY', inputYY);
    
        updateAgeContent();
    });
    
});