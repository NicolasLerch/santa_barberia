document.addEventListener("DOMContentLoaded", function(){

    console.log('JS calendar linkeado correctamente');
    const openFormBtns = document.querySelectorAll('#open-form-btn')
    const formContainer = document.getElementById('save-appointment-container')
    const cancelBtn = document.getElementById('cancel-btn')


    for(let button of openFormBtns){
        button.addEventListener('click', function(){
            formContainer.classList.add('show')
        })
    }

    cancelBtn.addEventListener('click', function(){
        formContainer.classList.remove('show')
    })

})