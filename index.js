const puppeteer = require("puppeteer");
const express = require("express");

const app = express();

app.get("/deals", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://store.playstation.com/pt-br/category/35027334-375e-423b-b500-0d4d85eff784/2"
  );

  const data = await page.evaluate(() => {
    const nodeList = document.querySelectorAll(".psw-product-tile");
    const offers = [...nodeList];

    const listOffers = offers.map((item) => {
      return {
        telemetryMeta: JSON.parse(item.parentElement.dataset.telemetryMeta),
        attributes: {
          posterImage: item
            .querySelector("img")
            .getAttribute("src")
            .replace("?w=54&thumb=true", ""),
          productType: item.children[1].children[0].innerText,
          discountBadge: item.querySelector(".psw-discount-badge__text")
            .innerText,
          discountText: item.querySelector(".sr-only").outerText,
          platformTag: item.querySelector(".psw-l-cluster").outerText,
        },
        links: {
          self: item.parentNode.href,
        },
      };
    });

    return listOffers;
  });

  await browser.close();

  res.send({ data });
});

// PS Plus monthly games

app.get("/subscriptions", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://store.playstation.com/pt-br/pages/subscriptions");

  const data = await page.evaluate(() => {
    // Get Ps Plus Monthly Games
    const nodeListPLUS = document.querySelectorAll("[data-qa-view-index='1'] .psw-product-tile");
    const subscriptions = [...nodeListPLUS];

    const psPlusMonthlyGames = subscriptions.map((item) => {
      return {
        telemetryMeta: JSON.parse(item.parentElement.dataset.telemetryMeta),
        attributes: {
          name: item.querySelector(".psw-product-tile__details span").innerText,
          plusUpSell:
            item.querySelector(
              ".psw-service-upsell .psw-service-upsell__contents span:last-child"
            ) === null
              ? ""
              : item.querySelector(
                  ".psw-service-upsell .psw-service-upsell__contents span:last-child"
                ).innerText,
          plusUpSell_Icon:
            item.querySelector(
              ".psw-service-upsell .psw-service-upsell__contents span:last-child"
            ) === null
              ? ""
              : item.querySelector(
                  ".psw-service-upsell .psw-service-upsell__contents span"
                ).innerHTML,
          posterImage: item
            .querySelector("img")
            .getAttribute("src")
            .replace("?w=54&thumb=true", ""),
        },
        links: {
          self: item.parentNode.href,
        },
      };
    });

    // Get Ps Plus exclusive discounts 
    const nodeListExclusiveDiscounts = document.querySelectorAll("[data-qa-view-index='2'] .psw-product-tile");
    const exclusiveDiscounts = [...nodeListExclusiveDiscounts];

    const newExclusiveDiscounts = exclusiveDiscounts.map((item) => {
      return {
        telemetryMeta: JSON.parse(item.parentElement.dataset.telemetryMeta),
        attributes: {
          name: item.querySelector(".psw-product-tile__details span").innerText,
          plusUpSell:
            item.querySelector(
              ".psw-service-upsell .psw-service-upsell__contents span:last-child"
            ) === null
              ? ""
              : item.querySelector(
                  ".psw-service-upsell .psw-service-upsell__contents span:last-child"
                ).innerText,
          plusUpSell_Icon:
            item.querySelector(
              ".psw-service-upsell .psw-service-upsell__contents span:last-child"
            ) === null
              ? ""
              : item.querySelector(
                  ".psw-service-upsell .psw-service-upsell__contents span"
                ).innerHTML,
          posterImage: item
            .querySelector("img")
            .getAttribute("src")
            .replace("?w=54&thumb=true", ""),
        },
        links: {
          self: item.parentNode.href,
        },
      };
    });

    // Get PS Plus exclusive packages
    const nodeListExclusivePackages = document.querySelectorAll("[data-qa-view-index='3'] .psw-product-tile"  );
    const exclusivePackages = [...nodeListExclusivePackages];

    const newExclusivePackages = exclusivePackages.map((item) => {
      return {
        telemetryMeta: JSON.parse(item.parentElement.dataset.telemetryMeta),
        attributes: {
          name: item.querySelector(".psw-product-tile__details span").innerText,
          plusUpSell:
            item.querySelector(
              ".psw-service-upsell .psw-service-upsell__contents span:last-child"
            ) === null
              ? ""
              : item.querySelector(
                  ".psw-service-upsell .psw-service-upsell__contents span:last-child"
                ).innerText,
          plusUpSell_Icon:
            item.querySelector(
              ".psw-service-upsell .psw-service-upsell__contents span:last-child"
            ) === null
              ? ""
              : item.querySelector(
                  ".psw-service-upsell .psw-service-upsell__contents span"
                ).innerHTML,
          posterImage: item
            .querySelector("img")
            .getAttribute("src")
            .replace("?w=54&thumb=true", ""),
        },
        links: {
          self: item.parentNode.href,
        },
      };
    });

    return { psPlusMonthlyGames, newExclusiveDiscounts, newExclusivePackages };
  });
  // PS Plus exclusive discounts

  await browser.close();
  res.send({ data });
});

const port = 3000;

app.listen(port, () => {
  console.log(
    `server iniciado na porta ${port} \nAcesse http://localhost:${port}`
  );
});
