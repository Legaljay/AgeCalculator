
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

    const textCol = document.querySelectorAll('label');

    
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
    
    document.querySelector('#inputDD').value = localStorage.getItem("inputDD")
    document.querySelector('#inputMM').value = localStorage.getItem("inputMM")
    document.querySelector('#inputYY').value = localStorage.getItem("inputYY")
    
    
    
    button.addEventListener('click', () => {  
    
        inputDD = parseInt(document.querySelector('#inputDD').value);
        inputMM = parseInt(document.querySelector('#inputMM').value);
        inputYY = parseInt(document.querySelector('#inputYY').value);
    
    
        const dd = todayDate.getDate();
        const mm = todayDate.getMonth()+1;
        const yy = todayDate.getFullYear();
    
    
        let ageYears = yy  - inputYY;
        let ageMonths = mm - inputMM;
        let ageDays = dd - inputDD;
            
    
    
        function validation(dd,yy,mm, inputMM, inputDD, inputYY) {
            const invalid = document.querySelector('#invalid');
            const invalides = document.querySelector('#invalides');
            const invalider = document.querySelector('#invalider');
             

            if (inputDD <1 &&  inputMM <1 && inputYY <1){
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";

                
                return true
            }

            if (inputDD <1 && inputMM <1 ){
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
    
                return true
            }

            
            if (inputMM <1 && inputYY <1 ){
                invalides.textContent = "Must be a valid date";
                invalid.textContent = "Must be a valid date";
            
                return true
            }
            

            if (inputDD < 1 || inputDD > 31 ){
                invalid.textContent = "Must be a valid date";
                
                return true
        
            }

            if (inputMM < 1 || inputMM > 12) {

                invalides.textContent = "Must be a valid date";
                

                return true
            }   

            if (inputDD <1 && inputMM <1 ){
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                
                return true
            }
            
            if(inputDD < 1 || inputDD > 31 && inputMM < 1 || inputMM >12) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                
                return true
            }

            if(!inputDD && !inputMM && !inputYY) {
                invalid.textContent = "This field is required";
                invalides.textContent = "This field is required";
                invalider.textContent = "This field is required";
                

                return true
            }

            if(!inputDD && !inputMM) {
                invalid.textContent = "This field is required";
                invalides.textContent = "This field is required";
                
                return true
            }
            
            if(!inputDD && !inputYY) {
                invalid.textContent = "This field is required";
                invalider.textContent = "This field is required";
    
                return true
            }

                        
            if(!inputMM && !inputYY) {
                invalides.textContent = "This field is required";
                invalider.textContent = "This field is required";
            
                return true
            }
    
            if (!inputDD){
                invalid.textContent = "This field is required";
                
                return true
            }
            if(!inputMM) {
                invalides.textContent = "This field is required";
                
                return true
            }
             if(!inputYY) {
                invalider.textContent = "This field is required";
            
                return true
            }

            if(inputDD.toString().length > 2){
                invalid.textContent = "Must bb a valid date";
                
                return true
            }

            if( inputMM.toString().length > 2){
                invalides.textContent = "Must bb a valid date";
            
                return true
            }

            
            if (inputDD > dd && inputMM > mm && inputYY == yy ) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                
                return true
            }  

            if (inputDD > dd && inputMM > mm && inputYY > yy ) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                
                return true
            }  


            if (inputYY < 1800 || inputYY > yy ) {
                invalider.textContent = "Must be a valid date";
                
                return true
            }   

            if (inputMM > mm && inputYY >= yy ) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                
                return true
            }  

            if (inputDD == dd && inputMM == mm && inputYY == yy ) {
                invalid.textContent = "Must be a valid date";
                invalides.textContent = "Must be a valid date";
                invalider.textContent = "Must be a valid date";
                
                return true
            }  

            if(inputMM == 2 && inputDD > 28 ){
                invalid.textContent = "Must bb a valid date";
                
                return true
            }

            if(inputMM == 4 && inputDD > 30 ){
                invalid.textContent = "Must bb a valid date";
                
                return true
            }

            if(inputMM == 9 && inputDD > 30 ){
                invalid.textContent = "Must bb a valid date";
                
                return true
            }

            if(inputMM == 6 && inputDD > 30 ){
                invalid.textContent = "Must bb a valid date";
                
                return true
            }

            if(inputMM == 11 && inputDD > 30 ){
                invalid.textContent = "Must bb a valid date";
                
                return true
            }

            if(inputYY.toString().length !== 4){
                invalider.textContent = "Must bb a valid date";
                
                return true
            }

            calculateAge(ageDays, ageMonths, ageYears);
            return ;
           
        } ; 
        
        validation();
        changeBorderColor();
        changeTextColor();
    
    
    
        function calculateAge(ageDays, ageMonths, ageYears){
            if ( ageMonths <= 0) {  //|| (ageMonths === 0 && ageDays < 0)
                ageYears--;    
                ageMonths += 12;
                    
            }
        
            if (ageDays < 0){
                const daysInLastMonth = new Date(yy,mm-1,0).getDate();
                ageDays += daysInLastMonth;
                ageMonths--;
            } 

            if (inputDD <= dd && inputMM == mm && inputYY >= yy){
                ageYears = 0;
                ageMonths = 0;
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
            

            updateAgeContent();
            console.log(ageDays, ageMonths, ageYears);
    
    
        }
    
           
           
    });
    
});
    
    
    
    
    
    