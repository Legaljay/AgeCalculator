// let presentDate = [dd, mm, yy];

// console.log(presentDate);

// let varDD = inputDD.addEventListener('input', (e) => e.target.value);
// let varMM = inputMM.addEventListener('input', (e) => e.target.value);
// let varYY = inputYY.addEventListener('input', (e) => e.target.value);

// let convertToDate = [varDD, varMM, varYY];
// console.log(convertToDate);



/*inputDD.addEventListener('input', (event) => 
{let valDD = event.target.value;
    date.textContent= valDD;
});

inputMM.addEventListener('input', (event) =>
{let valMM = event.target.value;
    month.textContent = valMM;
});

inputYY.addEventListener('input', (event) =>
{let valYY = event.target.value;
    year.textContent = valYY;
});*/

    /*date.textContent = inputDD.value;

    inputDD.addEventListener('input', vaDD);
    inputMM.addEventListener('input', vaMM);
    inputYY.addEventListener('input', vaYY);

    function vaDD (event) {
        let valDD = event.target.value;
        date.textContent= valDD;
    }
    
    function vaMM (event){
        let valMM = event.target.value;
        month.textContent = valMM;
    }
    
    function vaYY(event){
        let valYY = event.target.value;
        year.textContent = valYY;
    }

    button.addEventListener('click', () => {
    
        
});*/



document.addEventListener('DOMContentLoaded', ()=> {

    const button = document.querySelector('.btn');
    const inpute = document.querySelectorAll('input');
    let date = document.querySelector('#dy');
    let month = document.querySelector('#mnth');
    let year = document.querySelector('#yr');
    let inputYY = ''
    let inputMM = ''
    let inputDD = ''

    const inputD = document.querySelector('#inputDD');
    const inputM = document.querySelector('#inputMM');
    const inputY = document.querySelector('#inputYY');

    
    const todayDate = new Date();

    updateAgeContent();

    inputD.addEventListener('input', () => 
        localStorage.clear()

    )

    inputM.addEventListener('input', () => 
        localStorage.clear()

    )

    inputY.addEventListener('input', () => 
        localStorage.clear()
    )
    

    function updateAgeContent(){

        if (!localStorage.getItem("ageDays") || !localStorage.getItem("ageMonths") || !localStorage.getItem("ageYears")  ){

            date.textContent = "--";
            month.textContent =  "--";
            year.textContent =  "--";
        
        }else{
            date.textContent = localStorage.getItem("ageDays")
            month.textContent =  localStorage.getItem("ageMonths") ;
            year.textContent =  localStorage.getItem("ageYears") ;
        }
 

    };

    function toggleClass(){
        if (document.querySelectorAll('.span').innerText == null ){
            inpute.classList.toggle('input')
        }else{
            inpute.classList.toggle('inputError');
        }
    }
       
    
    document.querySelector('#inputDD').value = localStorage.getItem("inputDD")
    document.querySelector('#inputMM').value = localStorage.getItem("inputMM")
    document.querySelector('#inputYY').value = localStorage.getItem("inputYY")
    
    
    
    button.addEventListener('click', (e) => {  
    
        inputDD = parseInt(document.querySelector('#inputDD').value);
        inputMM = parseInt(document.querySelector('#inputMM').value);
        inputYY = parseInt(document.querySelector('#inputYY').value);
    
    
        const dd = todayDate.getDate();
        const mm = todayDate.getMonth()+1;
        const yy = todayDate.getFullYear();
    
    
        let ageYears = yy  - inputYY;
        let ageMonths = mm - inputMM;
        let ageDays = dd - inputDD;
            
    
            console.log(inputDD)
    
        function validation(e) {
            const invalid = document.querySelector('#invalid');
            const invalides = document.querySelector('#invalides');
            const invalider = document.querySelector('#invalider');
             

        
            if (!inputDD || !inputMM || !inputYY){
                invalid.textContent = "This field is required";
                invalides.textContent = "This field is required";
                invalider.textContent = "This field is required";

                toggleClass();
                // date.textContent = "--";
                // month.textContent =  "--";
                // year.textContent =  "--";
                updateAgeContent();
                return
    
            }

            if((inputDD.toString().length > 2 && inputMM.toString().length > 2) || (inputDD.toString().length < 2 && inputMM.toString().length < 2) || inputYY.toString().length > 4 || inputYY.toString().length < 4 ){
                invalid.textContent = "Must be two digit";
                invalides.textContent = "Must be two digit";
                invalider.textContent = "Must be four digit";

                toggleClass();
                updateAgeContent();
                return
            }

            if (inputDD < 1|| inputMM < 1 || inputDD > 31  || inputMM > 12 ){
                invalid.textContent = "Must aa a valid date";
                invalides.textContent = "Must aa a valid date";

                toggleClass();
                // date.textContent = "--";
                // month.textContent =  "--";
                // year.textContent =  "--";
                updateAgeContent();
                return
            
            }
                
            if(inputMM === 2 && inputDD > 28 ){
                invalid.textContent = "Must bb a valid date";
                invalides.textContent = "Must bb a valid date";

                toggleClass();
                // date.textContent = "--";
                // month.textContent =  "--";
                // year.textContent =  "--";
                updateAgeContent();
                return
            }

    
            invalid.textContent = "";
            invalides.textContent = "";
            invalider.textContent = "";
    
    
    
            calculateAge(ageDays, ageMonths, ageYears)
        } ; 
    
        validation();
    
    
    
        function calculateAge(ageDays, ageMonths, ageYears){
            if ( ageMonths <= 0) {  //|| (ageMonths === 0 && ageDays < 0)
                ageYears--;    
                ageMonths += 12;
                    
            }
        
            if (ageDays < 0){
                const daysInLastMonth = new Date(yy,mm-1,0).getDate();
                    // console.log(daysInLastMonth);
                ageDays += daysInLastMonth;
                ageMonths--;
            } 
    
            localStorage.setItem("ageDays", ageDays);
            localStorage.setItem("ageMonths", ageMonths);
            localStorage.setItem("ageYears", ageYears);
    
    
            localStorage.setItem("inputDD", inputDD);
            localStorage.setItem("inputMM", inputMM);
            localStorage.setItem("inputYY", inputYY);
    
            date.textContent = ageDays;
            month.textContent =  ageMonths;
            year.textContent =  ageYears;
    
            console.log(ageDays, ageMonths, ageYears);
    
    
        }
    
           
           
                
            // return {years: ageYears, months: ageMonths, days: ageDays};
    });
    
});
    
    
    
    
    
    