import { test, expect } from '@playwright/test';
import { SandboxPage } from './Pages/SandboxPage';

let randomText = 'text';

test.describe('Actions on Automation Sandbox', () => {

    test.only('Click on the button "ID Dinámico" en el @Sandbox', async ({ page, browserName }) => { // Skip if not Chromium

        test.info().annotations.push({ 
            type: 'JIRA-453432', 
            description: 'This test is only for Chromium' 
        });

        test.skip(browserName !== 'chromium', 'This test is only for Chromium'); // Skip if not Chromium
        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
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


    test('Fill the text field with "Hello World"', async ({ page }) => {


        test.fail(true, 'This test is failing');

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I fill the text field with "Hello World"', async () => {
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto', exact: true }), 'Textbox not found or not editable').toBeEditable();
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(randomText);
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).press('Shift+Home');
        });

        await test.step('Then the text field should be filled with "Hello World"', async () => {
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' })).toHaveValue(randomText);
        });
    });

    test('Validate the placeholder in the textbox ', async ({ page }) => {

        test.fixme(true, 'We have a bug here');

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I navigate to the textbox', async () => {
            await expect(page.getByPlaceholder('Ingresá texto', { exact: true }), 'Placeholder not found').toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto', exact: true }), 'Textbox not found').toBeEditable();
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto', exact: true }), 'Textbox not found').toBeVisible();
        });
    });



    test('I can check the checkboxes', async ({ page }) => {
        const sandboxPage = new SandboxPage(page);

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I check the checkboxes', async () => {
            await sandboxPage.checkPastaCheckbox();
            await page.getByRole('checkbox', { name: 'Pizza 🍕' }).check();
            await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).check();
            //await page.getByRole('checkbox', { name: 'Pizza 🍕'}).uncheck();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(sandboxPage.pastaCheckbox).toBeChecked();
            await expect(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' })).toBeChecked();
        });

    });

    test('I can check the radio buttons', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I check the checkboxes', async () => {
            await expect(page.getByText('Radio Buttons', { exact: true }), 'Radio Buttons text not found').toBeVisible();
            await expect(page.getByRole('radio', { name: 'Si', exact: true }), 'Si radio button not found').toBeVisible();
            await expect(page.getByRole('radio', { name: 'No', exact: true }), 'No radio button not found').toBeVisible();
            await page.getByText('Radio Buttons');
            await page.getByRole('radio', { name: 'Si' }).check();
            await page.getByRole('radio', { name: 'No' }).check();
            //await page.getByRole('checkbox', { name: 'Pizza 🍕'}).uncheck();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(page.getByRole('radio', { name: 'Si' }), 'Checkbox checked').not.toBeChecked();
            await expect(page.getByRole('radio', { name: 'No' }), 'Checkbox not checked').toBeChecked();
        });

    });

    test('I can select an option on a dropdown', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I select an option on a dropdown', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Voleibol', 'Hockey', 'Rugby', 'Golf', 'Tenis de Mesa', 'Atletismo', 'Natación', 'Ciclismo'];
            const notFound: string[] = [];
            for (let deporte of deportes) {
                const elemento = await page.locator(`select#formBasicSelect option`, { hasText: new RegExp(`^${deporte}$`, 'i') }).first();
                if (elemento) {
                    console.log(`Option found: '${deporte}'`);
                } else {
                    console.log(`Option not found: '${deporte}'`);
                    notFound.push(deporte);
                }
            }
            expect(notFound, `Options not found: + ${notFound.join(', ')}`).toHaveLength(0);
            const dropdownDeportes = page.locator('formBasicSelect');
            await expect(page.getByLabel('Dropdown', { exact: true }), 'Dropdown not found').toBeVisible();
            await expect(page.getByLabel('Dropdown', { exact: true }), 'Dropdown not editable').toBeEditable();
            await page.getByLabel('Dropdown').selectOption('Fútbol');
            await page.getByLabel('Dropdown').selectOption('Tennis');
            await page.getByLabel('Dropdown').selectOption('Basketball');
            await page.getByRole('button', { name: 'Enviar' }).click();
        });

        await test.step('Then the dropdown should be submitted', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });

    });

    test('Dropdown contains expected sports options', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        const dropdown = page.getByLabel('Dropdown');
        const deportes = [
            'Seleccioná un deporte',
            'Fútbol',
            'Tennis'
        ];
        await test.step('I can select an sport on a dropdown', async () => {
            await dropdown.selectOption('Fútbol');
        });

        await test.step('Then the dropdown should have the selected option', async () => {
            await expect(dropdown.locator('option')).toHaveText(deportes);
        });

    });


    test('I can select an option on a new dropdown', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I select an option on a new dropdown', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            // Check if any of the day links are visible using a RegExp pattern
            await expect(page.getByRole('link', { name: /^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)$/ }), 'Days not found').toBeVisible();
            await page.getByRole('link', { name: 'Lunes' }).click();
        });

        await test.step('Then the checkboxes should be checked', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });

    });

    test('I can upload a file', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I upload a file', async () => {
            await page.getByLabel('Upload file').setInputFiles(['test/fixtures/fileToUpload.txt', 'test/fixtures/fileToUpload1.txt']);
        });

        await test.step('Then the file should be uploaded', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });

    });


    test('I can drag and drop a file', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I drag and drop a file', async () => {
            await page.getByTestId('drag-drop-area').dragTo(page.getByTestId('drag-drop-area-2'));
        });

        await test.step('Then the file should be dragged and dropped', async () => {
            await expect(page.getByLabel('Dropdown')).not.toHaveValue('Basketball');
        });

    });

    //*   📘 Paso 1: Localizá la tabla
    //*   📘 Paso 2: Elegí la columna que te interesa
    //*   📘 Paso 3: Esperá que haya algo en pantalla
    //*   📘 Paso 4: Leé los textos
    //*   📘 Paso 5: Limpiá los textos
    //*   📘 Paso 6: Compará con lo que esperás

    test('I validate the values in the column "Nombre" of the static table', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('I can validate the names in the "Nombre" column of the static table', async () => {
            // Usamos un selector RELATIVO al encabezado h2
            const tableLocator = page.locator('h2:has-text("Tabla estática") + table');

            // Seleccionamos la primera columna (donde está el nombre)
            const nameCells = tableLocator.locator('tbody tr td:nth-child(2)');

            // Esperamos que se renderice al menos una celda
            await nameCells.first().waitFor({ state: 'visible' });
            
            await test.info().attach('screenshot', { // Attach a screenshot to the test info - not good a practice
                body: await page.screenshot(),
                contentType: 'image/png',
            });

            // Obtenemos todos los textos
            const rawValues: string[] = await nameCells.allTextContents();

            // Normalizamos los textos eliminando espacios
            const nameColumnValues: string[] = rawValues.map(val => val.trim());

            // Valores esperados
            const expectedNames: string[] = [
                'Messi',
                'Ronaldo',
                'Mbappe'
            ];

            const notFound: string[] = [];
            for (let name of expectedNames) {
                if (!nameColumnValues.includes(name)) {
                    notFound.push(name);
                }
            }
            if (notFound.length > 0) {
                throw new Error(`Names not found: '${notFound.join(', ')}'`);
            }

            // Log para debug
            console.log('📋 Nombres encontrados en tabla:', nameColumnValues);

            // Comparación
            expect(nameColumnValues, 'Names not found').toEqual(expectedNames);
            
        });

    });


    test('I validate the second column of the dinamic table', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I validate the second column of the dinamic table', async () => {
            //*   📘 Paso 1: Localizá la tabla
            //*   📘 Paso 2: Elegí la columna que te interesa
            //*   📘 Paso 3: Esperá que haya algo en pantalla
            //*   📘 Paso 4: Leé los textos
            //*   📘 Paso 5: Limpiá los textos
            //*   📘 Paso 6: Compará con lo que esperás
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            const secondColumn = tableLocator.locator('tbody tr td:nth-child(2)');
            await secondColumn.first().waitFor({ state: 'visible' });
            const secondColumnValues = await secondColumn.allTextContents();
            const secondColumnRawValues = secondColumnValues.map(val => val.trim());
            console.log('📋 Second column values:', secondColumnRawValues);
            await page.reload();
            const secondColumnReloaded = tableLocator.locator('tbody tr td:nth-child(2)');
            const secondColumnValuesReloaded = await secondColumnReloaded.allTextContents();
            const secondColumnRawValuesReloaded = secondColumnValuesReloaded.map(val => val.trim());
            console.log('📋 Second column values reloaded:', secondColumnRawValuesReloaded);
            expect(secondColumnRawValues).not.toEqual(secondColumnRawValuesReloaded);
        });

    });

    test('I validate a popup', async ({ page }) => {

        await test.step('Given I am on the Automation Sandbox page', async () => {
            await page.goto('');
        });

        await test.step('When I click on the button "Abrir Popup"', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'Cerrar' }).click();
        });

        await test.step('When I click on the button "Abrir Popup"', async () => {
            const popupPromise = page.waitForEvent('popup');
            await page.getByText('¿Viste? ¡Apareció un Pop-up!').click();
            const popup = await popupPromise;
            await popup.waitForLoadState();
            console.log(await popup.title());
        });

        await test.step('Then the popup should be closed', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).not.toBeVisible();
        });

    });



});