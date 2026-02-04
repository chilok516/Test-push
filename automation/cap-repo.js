const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://github.com/chilok516/Test-push');
  await page.screenshot({ path: '/tmp/repo-cap.png', fullPage: true });
  console.log('Screenshot saved');
  await browser.close();
})();
