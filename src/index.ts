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
  page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  for (let link of linkList) {
    const resMatch = link.match(/([^\/]+)([^.com])/g);
    if (!resMatch) return;
    await page.goto(link);
    await page.screenshot({ path: publicImagePath + `/${resMatch[1]}.png` });
  }

  browser.close();
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
