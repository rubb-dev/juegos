let jugadorActual = "0"
let victoria = false
let puntuacionX = 0
let puntuacion0 = 0

function posicion(celda) {
    if(celda.innerHTML != "" || victoria) return
    celda.innerHTML = jugadorActual
    comprobarTablero();
    jugadorActual == "0" ? jugadorActual = "X" : jugadorActual = "0"
}

function comprobarTablero() {
    for (let i = 0; i <= 2; i++) {
        comprobarGanador(document.getElementById("0_" + i).innerHTML, document.getElementById("1_" + i).innerHTML, document.getElementById("2_" + i).innerHTML)
        comprobarGanador(document.getElementById(i + "_0").innerHTML, document.getElementById(i + "_1").innerHTML, document.getElementById(i + "_2").innerHTML)
    }
    comprobarGanador(document.getElementById("0_0").innerHTML, document.getElementById("1_1").innerHTML, document.getElementById("2_2").innerHTML)
    comprobarGanador(document.getElementById("2_0").innerHTML, document.getElementById("1_1").innerHTML, document.getElementById("0_2").innerHTML)   
}

function comprobarGanador(uno, dos, tres) {
    if (uno != "" && uno == dos && uno == tres) {
        alert(`Ganaste ${jugadorActual}!`)
        victoria = true
        jugadorActual == "0" ? puntuacion0++ : puntuacionX++
        actualizarPuntuacion()
    }
}

function actualizarPuntuacion() {
    document.getElementById("puntuacionX").innerHTML = "PuntuaciónX: " + puntuacionX
    document.getElementById("puntuacion0").innerHTML = "Puntuación0: " + puntuacion0
}

function reiniciarJuego() {
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            document.getElementById(`${i}_${j}`).innerHTML = ""
        }
    }
    victoria = false
    jugadorActual = "0"
}

document.getElementById("reiniciarBtn").addEventListener("click", reiniciarJuego)

let burger = document.getElementById('burger')
let salir = document.getElementById('salir')
let nav = document.querySelector('.nav-right')

//listener a burger
burger.addEventListener('click', ()=>{
    nav.classList.add('mostrar');
});

//listener a salir

salir.addEventListener('click', ()=>{
    nav.classList.remove('mostrar');
});


