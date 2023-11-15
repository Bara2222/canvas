// Získání reference k HTML canvas elementu s id 'myCanvas'
let canvas = document.getElementById("myCanvas");

// Získání 2D vykreslovacího kontextu pro canvas
let ctx = canvas.getContext("2d");

// Nastavení barvy výplně na černou
ctx.fillStyle = "#000000";

// Vykreslení obdélníka, který pokryje celý canvas touto černou barvou
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Přidání posluchače událostí k celému dokumentu pro detekci stisku klávesy
document.addEventListener("keydown", function (event) {
  console.log(event);
  // Kontroluje, zda byla stisknuta klávesa Escape
  if (event.code === "Escape") {
    // Pokud ano, znovu vykreslí celý canvas šedou barvou
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return; // Ukončení funkce
  }
  switch (event.code) {
    case "KeyE":
      // Generuje náhodné souřadnice x a y uvnitř plátna
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      // Generuje náhodnou velikost obdélníka mezi 50 a 150
      let size = Math.random() * 100 + 50;
      // Generuje náhodnou barvu
      let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
    }
});

// Funkce pro vykreslení kruhu s srafováním čarami na plátno s danými parametry
function drawHatchedCircle(x, y, r, col, hatchSpacing) {
  ctx.strokeStyle = col;
  ctx.lineWidth = 2;

  // Vykreslení kruhu
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();

  // Vytvoření srafování s nastavitelným prostorem mezi čarami (hatchSpacing)
  for (let angle = 0; angle < Math.PI * 2; angle += hatchSpacing) {
    let x1 = x + r * Math.cos(angle);
    let y1 = y + r * Math.sin(angle);
    let x2 = x;
    let y2 = y;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.lineWidth = 1;
}

function randomEllipse() {
  let w = Math.random() * 100 + 50;
  let h = Math.random() * 100 + 50;
  let x = Math.random() * (canvas.width - w) + w / 2;
  let y = Math.random() * (canvas.height - h) + h / 2;
  let c = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  drawEllipse(x, y, w, h, c);
}

// Funkce pro vykreslení trojúhelníka s vnořenými nevyplněnými trojúhelníky
function drawNestedTriangles(x, y, size, levels, col) {
  ctx.strokeStyle = col;
  for (let i = 0; i < levels; i++) {
    let height = (Math.sqrt(3) / 2) * size;
    let x1 = x - size / 2;
    let y1 = y + height / 2;
    let x2 = x + size / 2;
    let y2 = y + height / 2;
    ctx.beginPath();
    ctx.moveTo(x, y - height / 2);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    size -= 10; // Zmenšení velikosti pro další vnořený trojúhelník
  }
}

// Přidání posluchače událostí k celému dokumentu pro detekci stisku klávesy
document.addEventListener("keydown", function (event) {
  // Náhodné souřadnice a barva pro nový tvar
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let col = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

  switch (event.code) {
    case "KeyR":
      drawHatchedCircle(x, y, 30, col, 0.2); // Změňte hodnotu hatchSpacing podle vaší preference
      break;
    case "KeyS":
      drawNestedTriangles(x, y, 100, 4, col);
      break;
  }
});
