const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://workspace.intersoftkk.com/workspace');
  
  // Login
  await page.waitForSelector('input[name="email"]', { timeout: 15000 });
  await page.fill('input[name="email"]', 'jacky.lok@intersoftkk.com');
  await page.fill('input[name="password"]', 'Ncl28825569.');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');
  
  // Wait for dashboard & Check In
  await page.waitForSelector('[data-slot="button"]:has-text("Check In"), button:has-text("Check In"), .check-in-btn', { timeout: 10000 });
  await page.click('[data-slot="button"]:has-text("Check In"), button:has-text("Check In")');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '/tmp/checkin-complete.png', fullPage: true });
  console.log('Check In complete, screenshot: /tmp/checkin-complete.png');
  
  await browser.close();
})();
