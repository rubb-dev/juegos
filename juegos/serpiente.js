// ************* OBJETO GRÁFICOS ***************

let graficos = {
    canvas: document.getElementById("canvas"),
    tamCuadro: 30,
    dibujarTablero: function (ctx) {
        // let ctx = graficos.canvas.getContext("2d")
        let actualY = 0
        juego.tablero.forEach(function comprobarLinea(linea) {
            linea = linea.split('')
            let actualX = 0
            linea.forEach(function comprobarCaracter(caracter) {
                if (caracter == "#") {
                    ctx.fillStyle = "black"
                    ctx.fillRect(actualX, actualY, graficos.tamCuadro, graficos.tamCuadro)
                }
                actualX += graficos.tamCuadro
            })
            actualY += graficos.tamCuadro
        })
    },
   
    dibujar: function (ctx, dibujo, color) {
        dibujo.forEach(function (parte) {
            let parteXloc = parte.x * graficos.tamCuadro
            let parteYloc = parte.y * graficos.tamCuadro
            ctx.fillStyle = color
            ctx.fillRect(parteXloc, parteYloc, graficos.tamCuadro, graficos.tamCuadro)
        })
    },
    dibujarJuego: function () {
        let ctx = graficos.canvas.getContext("2d")
        ctx.clearRect(0, 0, graficos.canvas.width, graficos.canvas.height)
        graficos.dibujarTablero(ctx)
        graficos.dibujar(ctx, juego.fruta, "red")
        graficos.dibujar(ctx, serpiente.partes, "#A0F56C")
        
    }
}


// ************* OBJETO JUEGO ***************

let juego = {
    contadorTick: 0,
    timer: null,
    puntuacion: 0,
    tablero: ["################",
        "#              #",
        "#              #",
        "#              #",
        "#     ####     #",
        "#     ####     #",
        "#     ####     #",
        "#              #",
        "#              #",
        "#              #",
        "################"],
    fruta: [
        { x: 1, y: 1 }
    ],
    tick: function () {
        //cancelar el timeout para que la serpiente no acelere 
        //con cada presión de tecla
        window.clearTimeout(juego.timer)
        juego.contadorTick++
        if(juego.contadorTick % 10 == 0){
            juego.nuevaFruta()
        }
        let resultado = serpiente.mover()
        if (resultado == "gameover") {
            alert("Game over!: Puntuación " + juego.puntuacion)
            return
        }
        graficos.dibujarJuego()
        juego.timer = window.setTimeout("juego.tick()", 500)
    },
    nuevaFruta: function(){
        let randomY = Math.floor(Math.random() * juego.tablero.length) + 0
        let randomX = Math.floor(Math.random() * juego.tablero[randomY].length) + 0
        let randomPosicion = {x: randomX, y: randomY} 
        if(juego.estaLibre(randomPosicion) && !juego.esFruta(randomPosicion)){
            juego.fruta.push(randomPosicion)
        }
    },
    estaLibre: function (posicion) {
        // let contenido = juego.tablero[posicion.x][posicion.y]
        // return contenido = ''
        return juego.tablero[posicion.y][posicion.x] == ' '
    },
    hayMuro: function (posicion) {
        return juego.tablero[posicion.y][posicion.x] == '#'
    },
    esFruta: function(posicion){
        for(let numFruta = 0; numFruta < juego.fruta.length; numFruta++){
            let fruta = juego.fruta[numFruta]
            if(posicion.x == fruta.x && posicion.y == fruta.y){
                juego.fruta.splice(numFruta, 1)
                return true
            }
        }
        return false
    },
    esSerpiente: function(posicion){
        for(let parteSerpiente = 0; parteSerpiente < serpiente.partes.length; parteSerpiente++){
            let parte = serpiente.partes[parteSerpiente]
            if(posicion.x == parte.x && posicion.y == parte.y){
                return true
            }
        }
        return false
    },
    reiniciar: function() {
        juego.puntuacion = 0
        serpiente.partes = [
            { x: 4, y: 2 },
            { x: 3, y: 2 },
            { x: 2, y: 2 }
        ]
        juego.fruta = [{ x: 1, y: 1 }]
        juego.contadorTick = 0
        graficos.dibujarJuego()
        juego.timer = window.setTimeout("juego.tick()", 500)
        document.getElementById("puntuacion").textContent = juego.puntuacion
    },
    
    
}



// ************* OBJETO SERPIENTE ***************

let serpiente = {
    partes: [
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 2 }
    ],
    direccion: "E",
    mover: function () {
        let posicion = serpiente.siguientePosicion()
        if (juego.hayMuro(posicion) || juego.esSerpiente(posicion)) {
            return "gameover"
        }

        if (juego.estaLibre(posicion)) {
            serpiente.partes.unshift(posicion)
            serpiente.partes.pop()
        }
        
        if(juego.esFruta(posicion)){
            serpiente.partes.unshift(posicion)
            juego.puntuacion++
            document.getElementById("puntuacion").textContent = juego.puntuacion
        }
    },
    siguientePosicion: function () {
        let cabeza = serpiente.partes[0]
        let objetivoX = cabeza.x
        let objetivoY = cabeza.y
        objetivoY = serpiente.direccion == "N" ? objetivoY - 1 : objetivoY
        objetivoY = serpiente.direccion == "S" ? objetivoY + 1 : objetivoY
        objetivoX = serpiente.direccion == "O" ? objetivoX - 1 : objetivoX
        objetivoX = serpiente.direccion == "E" ? objetivoX + 1 : objetivoX
        return { x: objetivoX, y: objetivoY }
    }

}

// ************* OBJETO CONTROL DE JUEGO ***************
let controlJuego = {
    inicioJuego: function () {
        window.addEventListener("keydown", controlJuego.procesarInput)
        juego.tick()
    },
    procesarInput: function (control) {
        let tecla = control.key.toLowerCase()
        let direccionObjetivo = serpiente.direccion
        if (tecla == "w" && serpiente.direccion != "S") direccionObjetivo = "N"
        if (tecla == "a" && serpiente.direccion != "E") direccionObjetivo = "O"
        if (tecla == "s" && serpiente.direccion != "N") direccionObjetivo = "S"
        if (tecla == "d" && serpiente.direccion != "O") direccionObjetivo = "E"
        serpiente.direccion = direccionObjetivo
        //juego.tick()
    }
}


// ************* LLAMADAS ***************

controlJuego.inicioJuego()

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


