import puppeteer from "puppeteer";
import * as fs from "fs";

const publicImagePath = __dirname + "/public/images";
const linkList = [
  "https://google.com",
  "https://facebook.com",
  "https://instagram.com",
];

const main = async () => {
  //   const browser = await puppeteer.launch();
  console.log("browser open!");
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  // page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto("https://github.com");
  const data = await page.evaluate(
    () =>
      document.querySelector(
        "body > div.application-main > main > div.overflow-hidden > div.home-hero-container.position-relative.js-webgl-globe-data > div.home-hero.position-absolute.z-1.top-0.right-0.bottom-0.left-0.overflow-hidden > div > div > div.col-12.col-lg-7.text-center.text-md-left > h1"
      )?.textContent
  );
  if (!data) return;
  const stringData = data
    .replace(",", "")
    .split("\n")
    .map(str => str.trim())
    .filter(str => str !== "")
    .join(" ");

  console.log(stringData);
  // browser.close();
};

const checkFolder = () => {
  const folderIsExist = fs.existsSync(publicImagePath);
  if (folderIsExist) return;
  console.log("folder not exist");
  console.log("create folder...");
  fs.mkdirSync(publicImagePath, { recursive: true });
  console.log("finishing create folder!");
};

async function startApp() {
  await checkFolder();
  await main();
}

startApp();
