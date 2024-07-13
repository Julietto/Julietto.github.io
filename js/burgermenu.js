
// JavaScript für das Burgermenü Toggle
document.querySelector('.burger-menu').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    navbar.classList.toggle('active');
    burger.classList.toggle('close');
});
