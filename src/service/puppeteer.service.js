const puppeteer = require("puppeteer");

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
      args: ["--window-size=1920,1080"],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(events[0].URL);
    console.log("Abriu a página");

    for (let i = 0; events.length > i; i++) {
      // console.log("entrou no FOR")
      let event = events[i];
      console.log(event);

      if (event.type === "click") {
        if (i !== 0) {
          if (event.URL !== events[i - 1].URL) {
            await page.goto(event.URL);
          }
        }

        if (event.target.tag === "a") {
          await page.goto(event.target.href);
        } else if (event.target.tag === "select") {
          await page.waitForSelector(targetSelector(event.target), {
            visible: true,
          });
          await page.click(targetSelector(event.target));

          await page.waitForSelector(`[value="${event.target.value}"]`, {
            visible: true,
          });
          await page.click(`[value="${event.target.value}"]`);
        } else {
          //esperar o seletor carregar
          await page.waitForSelector(targetSelector(event.target), {
            visible: true,
          });

          await page.click(targetSelector(event.target));
        }
      }
      if (event.type === "change") {
        console.log("Caiu no change");
        if (i !== 0) {
          if (event.URL !== events[i - 1].URL) {
            await page.goto(event.URL);
          }
        }

        if (event.target.tag === "select") {
          await page.waitForSelector(targetSelector(event.target), {
            visible: true,
          });
          await page.click(targetSelector(event.target));

          await page.waitForSelector(`[value="${event.target.value}"]`, {
            visible: true,
          });
          await page.click(`[value="${event.target.value}"]`);
        } else {
          await page.waitForSelector(targetSelector(event.target), {
            visible: true,
          });
          await page.click(targetSelector(event.target));

          await page.waitForSelector(targetSelector(event.target), {
            visible: true,
          });
          await page.type(targetSelector(event.target), event.target.value);
        }

        //esperar o seletor carregar
      }
    }
  })();
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
