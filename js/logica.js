let sw1 = false
let sw2 = false
let broken = false
let receive

function sw(receive) {
  if (receive === 1 && sw1 === false) {
    document.getElementById("sw1").src = "../img/swon.png";
    sw1 = true
  } else if (receive === 1 && sw1 === true) {
    document.getElementById("sw1").src = "../img/swoff.png";
    sw1 = false
  } else if (receive === 2 && sw2 === false) {
    document.getElementById("sw2").src = "../img/swon.png";
    sw2 = true
  } else if (receive === 2 && sw2 === true) {
    document.getElementById("sw2").src = "../img/swoff.png";
    sw2 = false
  }
  //lamp
  if (receive === 3) {
    let beep = new Audio();
    beep.src = "glassbreaking.wav";
    beep.play()
    document.getElementById("lamp").src = "../img/broken.jpg";
    broken = true
  }
  //and  
  if (broken !== true) {
    if (sw1 === true && sw2 === true) {
      document.getElementById("lamp").src = "../img/on.jpg"
    } else {
      document.getElementById("lamp").src = "../img/off.jpg"
    }
  }
/*
  //or
  if (broken !== true) {
    if (sw1 === true || sw2 === true) {
      document.getElementById("lamp").src = "img/on.jpg"
    } else {
      document.getElementById("lamp").src = "img/off.jpg"
    }
  }

  //not
  if (broken !== true) {
    if (!sw1) {
      document.getElementById("lamp").src = "img/on.jpg"
    } else {
      document.getElementById("lamp").src = "img/off.jpg"
    }
  }
  */
}
