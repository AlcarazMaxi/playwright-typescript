import { test, expect } from '@playwright/test';

/**
 * Test suite for Dynamic Table validation
 * Based on test plan: docs/test-plan-tabla-dinamica.md
 * 
 * This suite validates the dynamic table behavior in the Automation Sandbox page.
 * The dynamic table generates values that change on each page reload.
 */

test.describe('Dynamic Table - Test Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        // Navigate to Automation Sandbox page before each test
        await page.goto('');
    });

    // ============================================================================
    // 1. VALIDATION OF STRUCTURE AND PRESENCE (P0 - High Priority)
    // ============================================================================

    test('1.1 Verify that the dynamic table is present and visible', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
            await expect(page).toHaveURL(/sandbox-automation-testing/);
        });

        await test.step('When I locate the dynamic table section', async () => {
            // Wait for the "Tabla dinámica" header to be visible
            const tableHeader = page.getByRole('heading', { name: 'Tabla dinámica' });
            await expect(tableHeader, 'Table header not found').toBeVisible();
        });

        await test.step('Then the dynamic table should be present and visible', async () => {
            // Locate the table using relative selector to the header
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Verify table is visible
            await expect(tableLocator, 'Dynamic table not visible').toBeVisible();
            
            // Verify table exists in DOM
            const tableCount = await tableLocator.count();
            expect(tableCount, 'Table not found in DOM').toBe(1);
        });
    });

    test('1.2 Verify HTML structure of the table (thead, tbody, rows, columns)', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I locate the dynamic table', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Verify thead is present and visible
            const thead = tableLocator.locator('thead');
            await expect(thead, 'Table header (thead) not found').toBeVisible();
            
            // Verify tbody is present and visible
            const tbody = tableLocator.locator('tbody');
            await expect(tbody, 'Table body (tbody) not found').toBeVisible();
            
            // Count number of columns in header
            const headerCells = tableLocator.locator('thead th');
            const columnCount = await headerCells.count();
            expect(columnCount, 'No columns found in header').toBeGreaterThan(0);
            
            console.log(`📊 Number of columns: ${columnCount}`);
            
            // Count number of rows in tbody
            const rows = tableLocator.locator('tbody tr');
            const rowCount = await rows.count();
            expect(rowCount, 'No rows found in tbody').toBeGreaterThan(0);
            
            console.log(`📊 Number of rows: ${rowCount}`);
            
            // Verify all rows have the same number of columns as header
            for (let i = 1; i <= rowCount; i++) {
                const rowCells = tableLocator.locator(`tbody tr:nth-child(${i}) td`);
                const cellsInRow = await rowCells.count();
                expect(cellsInRow, `Row ${i} has different number of columns`).toBe(columnCount);
            }
        });

        await test.step('Then the table should have valid HTML structure', async () => {
            // All validations are done in the When step
            // This step confirms the structure is correct
        });
    });

    test('1.3 Verify column headers', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I locate the table headers', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Locate all headers
            const headers = tableLocator.locator('thead th');
            const headerCount = await headers.count();
            expect(headerCount, 'No headers found').toBeGreaterThan(0);
            
            // Read text of each header
            const headerTexts: string[] = [];
            for (let i = 0; i < headerCount; i++) {
                const headerText = await headers.nth(i).textContent();
                expect(headerText, `Header ${i + 1} is empty`).not.toBeNull();
                expect(headerText?.trim(), `Header ${i + 1} has no text`).not.toBe('');
                headerTexts.push(headerText!.trim());
            }
            
            console.log('📋 Column headers:', headerTexts);
            
            // Verify headers are not empty
            headerTexts.forEach((header, index) => {
                expect(header.length, `Header ${index + 1} is empty`).toBeGreaterThan(0);
            });
        });

        await test.step('Then all headers should be present and have descriptive text', async () => {
            // All validations are done in the When step
        });
    });

    // ============================================================================
    // 2. VALIDATION OF DYNAMIC DATA (P0 - High Priority)
    // ============================================================================

    test('2.1 Verify that values change when reloading the page', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I read the values from a column before reload', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Select a specific column (second column)
            const secondColumn = tableLocator.locator('tbody tr td:nth-child(2)');
            
            // Wait for column to be visible
            await secondColumn.first().waitFor({ state: 'visible' });
            
            // Read all values from the column
            const rawValues: string[] = await secondColumn.allTextContents();
            
            // Normalize values (trim spaces)
            const normalizedValues: string[] = rawValues.map(val => val.trim());
            
            console.log('📋 Second column values before reload:', normalizedValues);
            
            // Store values for comparison
            await test.step('And I reload the page', async () => {
                await page.reload();
            });
            
            await test.step('And I read the values from the same column after reload', async () => {
                // Wait for table to render again after reload
                await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
                
                // Relocate the column after reload
                const secondColumnReloaded = tableLocator.locator('tbody tr td:nth-child(2)');
                await secondColumnReloaded.first().waitFor({ state: 'visible' });
                
                // Read new values
                const rawValuesReloaded: string[] = await secondColumnReloaded.allTextContents();
                const normalizedValuesReloaded: string[] = rawValuesReloaded.map(val => val.trim());
                
                console.log('📋 Second column values after reload:', normalizedValuesReloaded);
                
                // Verify values are different
                expect(normalizedValues, 'Values should change after reload').not.toEqual(normalizedValuesReloaded);
                
                // Verify table is still visible after reload
                await expect(tableLocator, 'Table not visible after reload').toBeVisible();
            });
        });

        await test.step('Then the values should be different after reload', async () => {
            // Validation is done in the When step
        });
    });

    test('2.2 Verify that all columns have data (not empty)', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I check all columns for data', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Get total number of columns from header
            const headerCells = tableLocator.locator('thead th');
            const columnCount = await headerCells.count();
            expect(columnCount, 'No columns found').toBeGreaterThan(0);
            
            // Get number of rows
            const rows = tableLocator.locator('tbody tr');
            const rowCount = await rows.count();
            expect(rowCount, 'No rows found').toBeGreaterThan(0);
            
            // Check each column
            for (let colIndex = 1; colIndex <= columnCount; colIndex++) {
                const columnCells = tableLocator.locator(`tbody tr td:nth-child(${colIndex})`);
                
                // Wait for first cell to be visible
                await columnCells.first().waitFor({ state: 'visible' });
                
                // Read all values from the column
                const rawValues: string[] = await columnCells.allTextContents();
                
                // Normalize values
                const normalizedValues: string[] = rawValues.map(val => val.trim());
                
                // Verify no cell is empty
                normalizedValues.forEach((value, index) => {
                    expect(value.length, `Column ${colIndex}, Row ${index + 1} is empty`).toBeGreaterThan(0);
                });
                
                // Verify number of values matches number of rows
                expect(normalizedValues.length, `Column ${colIndex} has wrong number of values`).toBe(rowCount);
                
                console.log(`✅ Column ${colIndex}: ${normalizedValues.length} non-empty values`);
            }
        });

        await test.step('Then all columns should have valid data', async () => {
            // All validations are done in the When step
        });
    });

    // ============================================================================
    // 3. VALIDATION OF SPECIFIC COLUMNS (P1 - Medium Priority)
    // ============================================================================

    test('3.1 Validate the first column', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I read values from the first column', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Locate the first column
            const firstColumn = tableLocator.locator('tbody tr td:nth-child(1)');
            
            // Wait for at least the first cell to be visible
            await firstColumn.first().waitFor({ state: 'visible' });
            
            // Read all values from the first column
            const rawValues: string[] = await firstColumn.allTextContents();
            
            // Normalize values (trim)
            const normalizedValues: string[] = rawValues.map(val => val.trim());
            
            console.log('📋 First column values:', normalizedValues);
            
            // Verify values are not empty
            expect(normalizedValues.length, 'First column has no values').toBeGreaterThan(0);
            normalizedValues.forEach((value, index) => {
                expect(value.length, `First column, row ${index + 1} is empty`).toBeGreaterThan(0);
            });
        });

        await test.step('And I reload the page and verify values change', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            const firstColumn = tableLocator.locator('tbody tr td:nth-child(1)');
            
            // Read values before reload
            const rawValuesBefore: string[] = await firstColumn.allTextContents();
            const normalizedBefore: string[] = rawValuesBefore.map(val => val.trim());
            
            // Reload page
            await page.reload();
            
            // Wait for table to render again
            await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
            
            // Read values after reload
            const firstColumnAfter = tableLocator.locator('tbody tr td:nth-child(1)');
            await firstColumnAfter.first().waitFor({ state: 'visible' });
            
            const rawValuesAfter: string[] = await firstColumnAfter.allTextContents();
            const normalizedAfter: string[] = rawValuesAfter.map(val => val.trim());
            
            console.log('📋 First column values after reload:', normalizedAfter);
            
            // Verify values changed
            expect(normalizedBefore, 'First column values should change after reload').not.toEqual(normalizedAfter);
        });

        await test.step('Then the first column should have valid data that changes on reload', async () => {
            // All validations are done in previous steps
        });
    });

    test('3.2 Validate the second column', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I read values from the second column', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Locate the second column
            const secondColumn = tableLocator.locator('tbody tr td:nth-child(2)');
            
            // Wait for at least the first cell to be visible
            await secondColumn.first().waitFor({ state: 'visible' });
            
            // Read all values from the second column
            const rawValues: string[] = await secondColumn.allTextContents();
            
            // Normalize values (trim)
            const normalizedValues: string[] = rawValues.map(val => val.trim());
            
            console.log('📋 Second column values:', normalizedValues);
            
            // Verify values are not empty
            expect(normalizedValues.length, 'Second column has no values').toBeGreaterThan(0);
            normalizedValues.forEach((value, index) => {
                expect(value.length, `Second column, row ${index + 1} is empty`).toBeGreaterThan(0);
            });
        });

        await test.step('And I reload the page and verify values change', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            const secondColumn = tableLocator.locator('tbody tr td:nth-child(2)');
            
            // Read values before reload
            const rawValuesBefore: string[] = await secondColumn.allTextContents();
            const normalizedBefore: string[] = rawValuesBefore.map(val => val.trim());
            
            // Reload page
            await page.reload();
            
            // Wait for table to render again
            await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
            
            // Read values after reload
            const secondColumnAfter = tableLocator.locator('tbody tr td:nth-child(2)');
            await secondColumnAfter.first().waitFor({ state: 'visible' });
            
            const rawValuesAfter: string[] = await secondColumnAfter.allTextContents();
            const normalizedAfter: string[] = rawValuesAfter.map(val => val.trim());
            
            console.log('📋 Second column values after reload:', normalizedAfter);
            
            // Verify values changed
            expect(normalizedBefore, 'Second column values should change after reload').not.toEqual(normalizedAfter);
        });

        await test.step('Then the second column should have valid data that changes on reload', async () => {
            // All validations are done in previous steps
        });
    });

    test('3.3 Validate the third column (if exists)', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I check if a third column exists', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Get number of columns
            const headerCells = tableLocator.locator('thead th');
            const columnCount = await headerCells.count();
            
            console.log(`📊 Total columns: ${columnCount}`);
            
            if (columnCount >= 3) {
                // Locate the third column
                const thirdColumn = tableLocator.locator('tbody tr td:nth-child(3)');
                
                // Wait for it to be visible
                await thirdColumn.first().waitFor({ state: 'visible' });
                
                // Read all values
                const rawValues: string[] = await thirdColumn.allTextContents();
                const normalizedValues: string[] = rawValues.map(val => val.trim());
                
                console.log('📋 Third column values:', normalizedValues);
                
                // Verify values are not empty
                expect(normalizedValues.length, 'Third column has no values').toBeGreaterThan(0);
                normalizedValues.forEach((value, index) => {
                    expect(value.length, `Third column, row ${index + 1} is empty`).toBeGreaterThan(0);
                });
                
                // Reload and verify values change
                await page.reload();
                await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
                
                const thirdColumnAfter = tableLocator.locator('tbody tr td:nth-child(3)');
                await thirdColumnAfter.first().waitFor({ state: 'visible' });
                
                const rawValuesAfter: string[] = await thirdColumnAfter.allTextContents();
                const normalizedAfter: string[] = rawValuesAfter.map(val => val.trim());
                
                console.log('📋 Third column values after reload:', normalizedAfter);
                
                // Verify values changed
                expect(normalizedValues, 'Third column values should change after reload').not.toEqual(normalizedAfter);
            } else {
                console.log('ℹ️ Third column does not exist, skipping validation');
                test.skip(columnCount < 3, 'Third column does not exist');
            }
        });

        await test.step('Then the third column should have valid data that changes on reload (if exists)', async () => {
            // All validations are done in the When step
        });
    });

    // ============================================================================
    // 4. EDGE CASES AND ADDITIONAL VALIDATIONS (P1 - Medium Priority)
    // ============================================================================

    test('4.2 Verify number of rows remains consistent', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I count the number of rows before reload', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Count rows in tbody
            const rows = tableLocator.locator('tbody tr');
            const rowCountBefore = await rows.count();
            
            expect(rowCountBefore, 'No rows found before reload').toBeGreaterThan(0);
            console.log(`📊 Number of rows before reload: ${rowCountBefore}`);
            
            await test.step('And I reload the page', async () => {
                await page.reload();
            });
            
            await test.step('And I count the number of rows after reload', async () => {
                // Wait for table to render again
                await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
                
                // Count rows again
                const rowsAfter = tableLocator.locator('tbody tr');
                const rowCountAfter = await rowsAfter.count();
                
                console.log(`📊 Number of rows after reload: ${rowCountAfter}`);
                
                // Verify number of rows is the same (or within expected range)
                expect(rowCountAfter, 'Number of rows should be consistent').toBe(rowCountBefore);
            });
        });

        await test.step('Then the number of rows should remain consistent', async () => {
            // Validation is done in the When step
        });
    });

    test('4.1 Verify behavior with multiple reloads', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I read values and perform multiple reloads', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            const secondColumn = tableLocator.locator('tbody tr td:nth-child(2)');
            
            // Read initial values
            await secondColumn.first().waitFor({ state: 'visible' });
            const initialValues: string[] = (await secondColumn.allTextContents()).map(v => v.trim());
            console.log('📋 Initial values:', initialValues);
            
            // First reload
            await page.reload();
            await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
            const secondColumnReload1 = tableLocator.locator('tbody tr td:nth-child(2)');
            await secondColumnReload1.first().waitFor({ state: 'visible' });
            const valuesAfterReload1: string[] = (await secondColumnReload1.allTextContents()).map(v => v.trim());
            console.log('📋 Values after 1st reload:', valuesAfterReload1);
            
            // Verify values changed (at least once)
            const changedAfterFirstReload = JSON.stringify(initialValues) !== JSON.stringify(valuesAfterReload1);
            
            // Second reload
            await page.reload();
            await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });
            const secondColumnReload2 = tableLocator.locator('tbody tr td:nth-child(2)');
            await secondColumnReload2.first().waitFor({ state: 'visible' });
            const valuesAfterReload2: string[] = (await secondColumnReload2.allTextContents()).map(v => v.trim());
            console.log('📋 Values after 2nd reload:', valuesAfterReload2);
            
            // Verify table remains visible and functional
            await expect(tableLocator, 'Table not visible after multiple reloads').toBeVisible();
            
            // Verify that values changed in at least one of the reloads
            const changedAfterSecondReload = JSON.stringify(valuesAfterReload1) !== JSON.stringify(valuesAfterReload2);
            expect(changedAfterFirstReload || changedAfterSecondReload, 'Values should change in at least one reload').toBe(true);
        });

        await test.step('Then the table should remain functional after multiple reloads', async () => {
            // All validations are done in the When step
        });
    });

    // ============================================================================
    // 5. ACCESSIBILITY VALIDATION (P2 - Low Priority)
    // ============================================================================

    test('4.3 Verify table accessibility and semantic structure', async ({ page }) => {
        await test.step('Given I am on the Automation Sandbox page', async () => {
            // Page navigation is handled in beforeEach
        });

        await test.step('When I verify the semantic structure', async () => {
            const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');
            
            // Verify table element exists
            await expect(tableLocator, 'Table element not found').toBeVisible();
            
            // Verify thead exists
            const thead = tableLocator.locator('thead');
            await expect(thead, 'thead not found').toBeVisible();
            
            // Verify tbody exists
            const tbody = tableLocator.locator('tbody');
            await expect(tbody, 'tbody not found').toBeVisible();
            
            // Verify headers are in th elements within thead
            const headers = tableLocator.locator('thead th');
            const headerCount = await headers.count();
            expect(headerCount, 'No th elements in thead').toBeGreaterThan(0);
            
            console.log(`✅ Table has correct semantic structure with ${headerCount} headers`);
        });

        await test.step('Then the table should have correct semantic structure', async () => {
            // All validations are done in the When step
        });
    });

});

