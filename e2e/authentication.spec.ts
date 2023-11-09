import { test, expect } from '@playwright/test';
import { ServerResponse } from 'http';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ?? "";


// Be sure to generate data with the following "generate" script in frontend folder.

test('Authentication failed without credentials', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Mot de passe').fill('');

    const [response] = await Promise.all([
      page.waitForResponse(BACKEND_URL),
      page.click('text=CONNEXION'),
    ]);
    await expect(page.getByText('Connexion refusée')).toHaveText('Connexion refusée');

  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
});

test('Authentication succeed with credentials', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('marion@test.com');
    await page.getByLabel('Email').press('Tab');
    await page.getByLabel('Mot de passe').fill('Human76@');

    // Capture le réseau pour intercepter la requête API
    const [response] = await Promise.all([
      page.waitForResponse(BACKEND_URL),
      page.click('text=CONNEXION'),
    ]);

    // Vérifie le statut de la réponse API
    expect(response.status()).toBe(200); 

    await expect(page.getByText('Bonjour')).toHaveText('Bonjour');
  } catch (error) {
    console.error('Error :', error);
    throw error;
  }
});

