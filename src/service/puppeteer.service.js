const puppeteer = require('puppeteer');

const targetSelector = (target) => {
    if (target.class) {
        return `.${target.class}`;
    } else if (target.id) {
        return `#${target.id}`
    } else if (target.name) {
        return `[name="${target.name}"]`
    }
};

exports.puppeteerService = async (userEvents) => {
    // console.log(`Ações do usuário no Puppeteer: ${JSON.stringify(userEvents)}`);

    // console.log(userEvents)

    const events = userEvents.eventsTeste;

    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });

        const page = await browser.newPage();
        await page.goto(events[0].URL);
        //esperar a página carregar

        events.map(async (event, index) => {
            console.log(event);
    
            if (event.type === 'click') {
                //esperar o seletor carregar
                await page.click(targetSelector(event.target))
            }
            if (event.type === 'change') {
                console.log("Input")
            }
        })
    })();
}

/* 
    Primeira verificação de página - posição [0]
    Verificação de tipo de evento
    Verificação do seletor
    Faz o evento
    Verificação de mudança de url
*/

