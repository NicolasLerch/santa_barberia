document.addEventListener("DOMContentLoaded", () => {
    console.log('JS linkeado');

    const menuBtn = document.querySelector('.fa-solid.fa-bars');
    const navMobile = document.querySelector('.dropdown-container');
    const body = document.querySelector('body');

    menuBtn.addEventListener('click', () => {
        console.log('Click')
        navMobile.classList.toggle('show');
        body.classList.toggle('no-scroll');
    })

})