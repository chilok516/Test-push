const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://workspace.intersoftkk.com/workspace');
  
  // Wait for form
  await page.waitForSelector('input[name="email"], input[name="password"]', { timeout: 15000 });
  await page.screenshot({ path: '/tmp/login-form-fixed.png', fullPage: true });
  console.log('Fixed login form: /tmp/login-form-fixed.png');
  
  // Exact login with corrected password
  await page.fill('input[name="email"]', 'jacky.lok@intersoftkk.com');
  await page.fill('input[name="password"]', 'Ncl28825569.');
  await page.click('button[type="submit"]');
  
  // Wait for response
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  
  const hasLoginForm = await page.locator('input[name="email"]').count() > 0;
  console.log('Has login form after fixed submit:', hasLoginForm);
  
  await page.screenshot({ path: '/tmp/dashboard-fixed.png', fullPage: true });
  console.log('Fixed dashboard: /tmp/dashboard-fixed.png');
  
  await browser.close();
  console.log('Fixed test complete. Success:', !hasLoginForm);
})();
