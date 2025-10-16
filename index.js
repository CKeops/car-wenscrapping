import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://seminovos.com.br/revenda/seta-car?ordenarPor=2&paginas=50", {
    waitUntil: "networkidle2",
  });

  // Espera os elementos carregarem
  await page.waitForSelector(".col-6.col-md-3.col-lg-3");

  // Extrai os links
  const links = await page.evaluate(() => {
    // Seleciona todas as divs com a classe específica
    const divs = document.querySelectorAll(".col-6.col-md-3.col-lg-3");

    // Para cada div, pega o href do <a> dentro dela
    return Array.from(divs).map(div => {
      const a = div.querySelector("a");
      return a ? a.href : null;
    }).filter(link => link !== null); // remove nulos
  });

  console.log(links);

  await browser.close();

  // infos para pegar
  // Modelo, versão , Quiloletragem,ano , combustivel, aceita troca, cor ,portas, cambio, foto
  
}

main();