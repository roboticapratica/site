const cores = [
    { nome: "Preto", valor: 0, mult: 1, cor: "#000000" },
    { nome: "Marrom", valor: 1, mult: 10, tol: "±1%", cor: "#8B4513" },
    { nome: "Vermelho", valor: 2, mult: 100, cor: "#FF0000" },
    { nome: "Laranja", valor: 3, mult: 1_000, cor: "#FFA500" },
    { nome: "Amarelo", valor: 4, mult: 10_000, cor: "#FFFF00" },
    { nome: "Verde", valor: 5, mult: 100_000, tol: "±0.5%", cor: "#008000" },
    { nome: "Azul", valor: 6, mult: 1_000_000, tol: "±0.25%", cor: "#0000FF" },
    { nome: "Violeta", valor: 7, mult: 10_000_000, tol: "±0.1%", cor: "#8A2BE2" },
    { nome: "Cinza", valor: 8, tol: "±0.05%", cor: "#808080" },
    { nome: "Branco", valor: 9, cor: "#FFFFFF" },
    { nome: "Dourado", mult: 0.1, tol: "±5%", cor: "#FFD700" },
    { nome: "Prata", mult: 0.01, tol: "±10%", cor: "#C0C0C0" }
]

const faixa1 = document.getElementById("faixa1")
const faixa2 = document.getElementById("faixa2")
const mult = document.getElementById("multiplicador")
const tol = document.getElementById("tolerancia")
const tolInv = document.getElementById("tolInverso")

function adicionarOpcao(select, texto, valor, cor) {
    const opt = document.createElement("option")
    opt.value = valor
    opt.textContent = texto
    opt.style.backgroundColor = cor;
    if (cor.toLowerCase() === "#ffffff") {
        opt.style.color = "#000"
    } else if (["#000000", "#8b4513", "#0000ff"].includes(cor.toLowerCase())) {
        opt.style.color = "#fff"
    }
    select.appendChild(opt)
}

function adicionarSelecionar(select) {
    const opt = document.createElement("option")
    opt.value = ""
    opt.textContent = "Selecionar cor"
    opt.disabled = true
    opt.selected = true
    select.appendChild(opt)
}

function preencherSelects() {
    [faixa1, faixa2, mult, tol, tolInv].forEach(select => adicionarSelecionar(select))
    cores.forEach(c => {
        if (c.valor !== undefined) {
            adicionarOpcao(faixa1, c.nome, c.valor, c.cor)
            adicionarOpcao(faixa2, c.nome, c.valor, c.cor)
        }
        if (c.mult !== undefined) {
            adicionarOpcao(mult, c.nome, c.mult, c.cor)
        }
        if (c.tol !== undefined) {
            adicionarOpcao(tol, c.tol, c.tol, c.cor)
            adicionarOpcao(tolInv, c.tol, c.tol, c.cor)
        }
    })
}

function calcularResistor() {
    const dig1 = parseInt(faixa1.value)
    const dig2 = parseInt(faixa2.value)
    const multiplicador = parseFloat(mult.value)
    const tolerancia = tol.options[tol.selectedIndex].text

    if (isNaN(dig1) || isNaN(dig2) || isNaN(multiplicador)) {
        document.getElementById("resultado").innerHTML = "Selecione todas as cores."
        return;
    }

    const resistencia = (dig1 * 10 + dig2) * multiplicador
    let valorFormatado

    if (resistencia >= 1e6) {
        valorFormatado = (resistencia / 1e6).toFixed(2) + " MΩ"
    } else if (resistencia >= 1e3) {
        valorFormatado = (resistencia / 1e3).toFixed(2) + " kΩ"
    } else {
        valorFormatado = resistencia + " Ω"
    }

    document.getElementById("resultado").innerHTML =
        `Valor do Resistor: <strong>${valorFormatado} ${tolerancia}</strong>`
}

function calcularCores() {
    const valor = parseFloat(document.getElementById("valorResistor").value)
    const tolerancia = tolInv.value

    if (isNaN(valor) || valor <= 0) {
        document.getElementById("coresResultado").innerHTML = "Informe um valor válido."
        return
    }

    let significativos = valor
    let multiplicador = 1

    while (significativos >= 100) {
        significativos /= 10
        multiplicador *= 10
    }

    const dig1 = Math.floor(significativos / 10)
    const dig2 = Math.floor(significativos % 10)

    const cor1 = cores.find(c => c.valor === dig1)
    const cor2 = cores.find(c => c.valor === dig2)
    const corMult = cores.find(c => c.mult === multiplicador)
    const corTol = cores.find(c => c.tol === tolerancia)

    if (!cor1 || !cor2 || !corMult || !corTol) {
        document.getElementById("coresResultado").innerHTML = "Valor não pode ser representado com 4 faixas."
        return
    }

    document.getElementById("coresResultado").innerHTML = `
      Cores: 
      <span class="cor-preview" style="background:${cor1.cor}" title="${cor1.nome}"></span>
      <span class="cor-preview" style="background:${cor2.cor}" title="${cor2.nome}"></span>
      <span class="cor-preview" style="background:${corMult.cor}" title="${corMult.nome}"></span>
      <span class="cor-preview" style="background:${corTol.cor}" title="${corTol.nome}"></span>
    `
}

window.onload = preencherSelects