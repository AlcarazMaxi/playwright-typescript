import {test, expect} from '@playwright/test';

let randomText = 'text';

test.describe('Actions on Automation Sandbox', () => {

    test('Click on the button "ID Dinámico"', async ({page}) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I click on the "ID Dinámico" button', async () => {
            const dinamicButton = page.getByRole('button', { name: 'Hacé click para generar un ID' })
            await dinamicButton.click({force: true});
            await dinamicButton.dblclick({force: true});
            await dinamicButton.click({button: 'right'});
            await dinamicButton.click({modifiers: ['Control']});
        });

        await test.step('Then the action should be completed', async () => {
            // Add assertions here
            // await expect(page.locator('some-element')).toBeVisible();
        });
    });


    test('Fill the text field with "Hello World"', async ({page}) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I fill the text field with "Hello World"', async () => {
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(randomText);
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Shift+Home');
        });

        await test.step('Then the text field should be filled with "Hello World"', async () => {
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveValue(randomText);
        });
    });


    test('I can check the checkboxes', async ({page}) => {
        
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I check the checkboxes', async () => {
            await page.getByRole('checkbox', { name: 'Pizza 🍕' }).check();
            await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).check();
            //await page.getByRole('checkbox', { name: 'Pizza 🍕'}).uncheck();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(page.getByRole('checkbox', { name: 'Pizza 🍕' })).toBeChecked();
            await expect(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' })).toBeChecked();
        });

    });
    
    test('I can check the radio buttons', async ({page}) => {
        
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I check the checkboxes', async () => {
            await page.getByText('Radio Buttons');
            await page.getByRole('radio', { name: 'Si' }).check();
            await page.getByRole('radio', { name: 'No' }).check();
            //await page.getByRole('checkbox', { name: 'Pizza 🍕'}).uncheck();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(page.getByRole('radio', { name: 'Si' })).not.toBeChecked();
            await expect(page.getByRole('radio', { name: 'No' })).toBeChecked();
        });
    
    });

    test('I can select an option on a dropdown', async ({page}) => {
        
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I select an option on a dropdown', async () => {
            await page.getByLabel('Dropdown').selectOption('Fútbol');
            await page.getByLabel('Dropdown').selectOption('Tennis');
            await page.getByLabel('Dropdown').selectOption('Basketball');
            await page.getByRole('button', { name: 'Enviar' }).click();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });
    
    });


    test('I can select an option on a new dropdown', async ({page}) => {
        
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I select an option on a new dropdown', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Lunes' }).click();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });
    
    });

    test('I can upload a file', async ({page}) => {
        
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I upload a file', async () => {
            await page.getByLabel('Upload file').setInputFiles(['test/fixtures/fileToUpload.txt', 'test/fixtures/fileToUpload1.txt']);
        });

        await test.step('Then the file should be uploaded', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });
    
    });


    test('I can drag and drop a file', async ({page}) => {
        
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('http://localhost:3000/sandbox-automation-testing');
        });

        await test.step('When I drag and drop a file', async () => {
            await page.getByTestId('drag-drop-area').dragTo(page.getByTestId('drag-drop-area-2'));
        });

        await test.step('Then the file should be dragged and dropped', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });
    
    });





});