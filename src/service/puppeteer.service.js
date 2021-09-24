const puppeteer = require("puppeteer");

const targetSelector = (target) => {
  console.log("Oláaaaaa");
  if (target.id) {
    console.log(`#${target.id}`);
    return `#${target.id}`;
  } else if (target.name) {
    console.log(`#${target.name}`);
    return `[name="${target.name}"]`;
  } else if (target.class) {
    console.log(`#${target.class}`);
    return `.${target.class}`;
  }
};

exports.puppeteerService = async (userEvents) => {
  // console.log(`Ações do usuário no Puppeteer: ${JSON.stringify(userEvents)}`);

  console.log(userEvents);

  const events = userEvents.eventsTeste;

  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto(events[0].URL);
    console.log("Abriu a página");
    //espera a página carregar
    //await page.waitForNavigation();
    console.log("Esperou a navegação");

    events.map(async (event, index) => {
      console.log(event);
      console.log("Entrou no map");

      if (event.type === "click") {
        if (index !== 0) {
          if (event.URL !== events[index - 1].URL) {
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
        if (index !== 0) {
          if (event.URL !== events[index - 1].URL) {
            await page.goto(event.URL);
          }
        }

        //esperar o seletor carregar
        await page.waitForSelector(targetSelector(event.target));
        await page.type(targetSelector(event.target), event.value);

        console.log("Input");
      }
    });
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
