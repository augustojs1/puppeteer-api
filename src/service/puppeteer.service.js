const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const generateRandomString = require("../utils/GenerateRandomString");

const targetSelector = (target) => {
  if (target.id) {
    return `#${target.id}`;
  } else if (target.name) {
    return `[name="${target.name}"]`;
  } else if (target.class) {
    return `.${target.class}`;
  }
};

exports.puppeteerService = async (userEvents) => {
  const events = userEvents.eventsTeste;

  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto(events[0].URL);
    console.log("Abriu a página");

    for (let i = 0; events.length > i; i++) {
      let event = events[i];
      console.log(event);
      console.log("Entrou no map");

      if (event.type === "click") {
        if (i !== 0) {
          if (event.URL !== events[i - 1].URL) {
            await page.goto(event.URL);
          }
        }

        if (event.target.tag === "a") {
          await page.goto(event.target.href);
        } else {
          //esperar o seletor carregar
          await page.waitForSelector(targetSelector(event.target));

          await page.click(targetSelector(event.target));
        }
      }
      if (event.type === "change") {
        if (i !== 0) {
          if (event.URL !== events[i - 1].URL) {
            await page.goto(event.URL);
          }
        }

        await page.waitForSelector(targetSelector(event.target));
        await page.click(targetSelector(event.target));

        await page.waitForSelector(targetSelector(event.target));
        await page.type(targetSelector(event.target), event.value);

        //esperar o seletor carregar
      }
    }
  })();
};

exports.saveScriptToFile = async (userEvents) => {
  const randomString = generateRandomString();

  fs.writeFileSync(
    path.join(
      __dirname,
      "..",
      "database",
      `UserEventsScript-${randomString}.json`
    ),
    JSON.stringify(userEvents),
    function (err) {
      if (err) throw err;
      console.log("Script saved into the database!");
    }
  );
};

/* 
    Primeira verificação de página - posição [0] | feito
    Esperar a página carregar | feito
    Verificação de tipo de evento | feito
    Verificação do seletor | feito
    Faz o evento | feito
    Verificação de mudança de url | feito


    Talvez trocar a verificação inicial, passando a verificar um seletor em vez do carregamento da página
    Verificar o porque de await page.waitForNavigation(); não funcionar as vezes
    Verificar se await page.waitForNavigation(); está falhando em todas as ocasioões
    Verificar por que a automação não está indo até o final
*/
