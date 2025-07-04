const ledContainer = document.getElementById('ledContainer')
const totalLeds = 6
const leds = []

for (let i = 0; i < totalLeds; i++) {
    const span = document.createElement('span')
    span.textContent = '⬛'
    ledContainer.appendChild(span)
    leds.push(span)
}

let index = totalLeds - 1
let intervalId

function apagarTudo() {
    leds.forEach(led => led.textContent = '⬛')
    index = totalLeds - 1
    setTimeout(() => {
        iniciarAnimacao()
    }, 200)
}

function animarSeta() {
    leds[index].textContent = '🟧'

    if (index === 0) {
        clearInterval(intervalId)
        setTimeout(() => {
            apagarTudo()
        }, 150)
    } else {
        index--
    }
}

function iniciarAnimacao() {
    intervalId = setInterval(animarSeta, 75)
}

iniciarAnimacao()