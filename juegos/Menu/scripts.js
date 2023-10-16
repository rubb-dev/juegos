//referencia de elementos del DOM
let burger = document.getElementById('burger')
let salir = document.getElementById('salir')
let nav = document.querySelector('nav')

//listener a burger
burger.addEventListener('click', ()=>{
    nav.classList.add('mostrar')
})

//listener a salir

salir.addEventListener('click', ()=>{
    nav.classList.remove('mostrar')
})
