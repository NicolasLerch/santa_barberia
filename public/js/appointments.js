document.addEventListener("DOMContentLoaded", () => {
    console.log('JS linkeado');

    let cutBtn = document.querySelector('.cut-btn');
    let cutBeardBtn = document.querySelector('.cut-beard-btn');

    let cutCalendy = document.querySelector('.calendly-container.cut');
    let cutBeardCalendly = document.querySelector('.calendly-container.cut-and-beard');


    cutBtn.addEventListener('click', () => {
        cutBtn.classList.add('disabled');
        cutBeardBtn.classList.remove('disabled');
        cutCalendy.classList.add('show');
        cutCalendy.classList.remove('hide');
        cutBeardCalendly.classList.add('hide');
    })

    cutBeardBtn.addEventListener('click', () => {
        cutBeardBtn.classList.add('disabled');
        cutBtn.classList.remove('disabled');
        cutBeardCalendly.classList.add('show');
        cutBeardCalendly.classList.remove('hide');
        cutCalendy.classList.add('hide');
    })

})