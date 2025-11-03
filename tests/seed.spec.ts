import { test, expect } from '@playwright/test';

test.describe('Actions on Automation Sandbox', () => {

  test('Click on the button "ID Dinámico" en el @Sandbox', async ({ page, browserName }) => { // Skip if not Chro

      test.info().annotations.push({ 
          type: 'JIRA-453432', 
          description: 'This test is only for Chromium' 
      });

      test.skip(browserName !== 'chromium', 'This test is only for Chromium'); // Skip if not Chromium
      await test.step('Given I am on the Automation Sandbox page', async () => {
          await page.goto('/');
      });

      await test.step('When I click on the "ID Dinámico" button', async () => {
          const dinamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' })
          await dinamicButton.click({ force: true });
          await dinamicButton.dblclick({ force: true });
          await dinamicButton.click({ button: 'right' });
          await dinamicButton.click({ modifiers: ['Control'] });
      });

      await test.step('Then the action should be completed', async () => {
          await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.', { exact: true }), 'Text not found').toBeVisible({ timeout: 10000 });
          // Add assertions here
          // await expect(page.locator('some-element')).toBeVisible();
      });
  });
});
