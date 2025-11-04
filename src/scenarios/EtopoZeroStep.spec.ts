import { test } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test('zerostep example', async ({ page }) => {
  await page.goto('https://etopocart.com/');

  const aiArgs = { page, test };
  await ai('Fill the contact form with valid name, email and message', aiArgs);
});