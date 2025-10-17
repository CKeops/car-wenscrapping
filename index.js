import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
  );

  await page.goto("https://seminovos.com.br/revenda/seta-car?ordenarPor=2&paginas=50", {
    waitUntil: "networkidle2",
  });


  await page.waitForSelector(".col-6.col-md-3.col-lg-3");
  await page.mouse.move(100, 200);

  await page.mouse.move(200, 99);


  const links = await page.evaluate(() => {

    const divs = document.querySelectorAll(".col-6.col-md-3.col-lg-3");



    return Array.from(divs).map(div => {
      const a = div.querySelector("a");
      return a ? a.href : null;
    }).filter(link => link !== null); // remove nulos
  });

  console.log(links);

  let counter = 0

  for (const link of links) {
    counter++;

    await page.goto(link, { waitUntil: "networkidle2" });

    await page.mouse.move(100, 200);

    await page.mouse.move(200, 99);
    try {
      await page.waitForSelector(".mb-0.mt-2.mt-md-0.pr-5", { timeout: 8000 });
    } catch {
      console.log(`Elemento não encontrado na página ${link}`);
    }

    await page.screenshot({ path: `pagina${counter}.png`, fullPage: true });

    console.log(`Screenshot salva: pagina${counter}.png`);
  }

  await browser.close();



  // infos para pegar
  // Modelo, versão , Quiloletragem,ano , combustivel, aceita troca, cor ,portas, cambio, foto

}

main();