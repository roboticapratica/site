let estados = {
  and: { sw1: false, sw2: false, broken: false },
  or: { sw1: false, sw2: false, broken: false },
  not: { sw1: false, broken: false }
};

function tocarSomVidro() {
  const beep = new Audio("glassbreaking.wav");
  beep.play();
}

function alternar(id, modo, qual) {
  const grupo = estados[modo];

  // Clicou na lâmpada → quebra
  if (qual === "lamp") {
    if (!grupo.broken) {
      document.getElementById(id).src = "../img/broken.jpg";
      grupo.broken = true;
      tocarSomVidro();
    }
    return;
  }

  // Alternar estado do interruptor
  grupo[qual] = !grupo[qual];
  document.getElementById(id).src = grupo[qual] ? "../img/swon.png" : "../img/swoff.png";

  // Atualizar lâmpada com base no operador lógico
  if (grupo.broken) return;

  const lampId = "lamp" + (modo === "and" ? "" : modo);
  let acende = false;

  if (modo === "and") acende = grupo.sw1 && grupo.sw2;
  else if (modo === "or") acende = grupo.sw1 || grupo.sw2;
  else if (modo === "not") acende = !grupo.sw1;

  document.getElementById(lampId).src = acende ? "../img/on.jpg" : "../img/off.jpg";
}
