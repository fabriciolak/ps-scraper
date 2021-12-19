const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Pronto');
})

const port = 3000;

app.listen(port, () => {
  console.log(`server iniciado na porta ${port} \n Acesse http://localhost:${port}`)
})

;(async () => {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto('https://einerd.com.br');
  await page.screenshot({ path: 'print.png' });

  await browser.close();
})();
