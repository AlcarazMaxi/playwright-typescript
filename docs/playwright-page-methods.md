# Métodos de Page en Playwright - Guía Completa

## Navegación

### `page.goto(url, options?)`
Navega a una URL específica.
```typescript
await page.goto('https://www.freerangetesters.com');
await page.goto('https://example.com', { waitUntil: 'networkidle' });
```
**Consideraciones:**
- Siempre usar `await` ya que es asíncrono
- Opciones disponibles: `waitUntil`, `timeout`
- `waitUntil: 'networkidle'` espera a que no haya requests por 500ms

### `page.reload(options?)`
Recarga la página actual.
```typescript
await page.reload();
await page.reload({ waitUntil: 'domcontentloaded' });
```

### `page.goBack(options?)` / `page.goForward(options?)`
Navegación hacia atrás/adelante en el historial.
```typescript
await page.goBack();
await page.goForward();
```

## Localización de Elementos

### `page.locator(selector)`
Localiza elementos en la página.
```typescript
await page.locator('#page_header').click();
await page.locator('button[type="submit"]').click();
await page.locator('.class-name').first().click();
```

### `page.getByRole(role, options?)`
Localiza elementos por su rol ARIA.
```typescript
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByRole('link', { name: 'Cursos', exact: true }).click();
await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
```
**Consideraciones:**
- `exact: true` hace match exacto del texto
- Útil para accesibilidad y elementos semánticos

### `page.getByText(text, options?)`
Localiza elementos por su texto visible.
```typescript
await page.getByText('Login').click();
await page.getByText('Welcome', { exact: false }).click();
```

### `page.getByLabel(label, options?)`
Localiza elementos por su etiqueta asociada.
```typescript
await page.getByLabel('Email Address').fill('test@example.com');
await page.getByLabel('Password').fill('password123');
```

### `page.getByPlaceholder(placeholder)`
Localiza elementos por su placeholder.
```typescript
await page.getByPlaceholder('Enter your email').fill('test@example.com');
```

### `page.getByAltText(altText)`
Localiza imágenes por su texto alternativo.
```typescript
await page.getByAltText('Company Logo').click();
```

### `page.getByTitle(title)`
Localiza elementos por su atributo title.
```typescript
await page.getByTitle('Close dialog').click();
```

### `page.getByTestId(testId)`
Localiza elementos por su atributo data-testid.
```typescript
await page.getByTestId('submit-button').click();
```

## Interacciones

### `page.click(selector, options?)`
Hace click en un elemento.
```typescript
await page.click('#submit-btn');
await page.click('button', { force: true }); // Fuerza el click aunque esté cubierto
```

### `page.dblclick(selector, options?)`
Doble click en un elemento.
```typescript
await page.dblclick('.file-item');
```

### `page.hover(selector, options?)`
Pasa el mouse sobre un elemento.
```typescript
await page.hover('.menu-item');
```

### `page.fill(selector, value, options?)`
Llena un campo de texto.
```typescript
await page.fill('#email', 'test@example.com');
await page.fill('input[name="password"]', 'password123');
```

### `page.type(selector, text, options?)`
Escribe texto carácter por carácter.
```typescript
await page.type('#search', 'playwright', { delay: 100 }); // 100ms entre caracteres
```

### `page.press(selector, key, options?)`
Presiona una tecla específica.
```typescript
await page.press('body', 'Enter');
await page.press('#input', 'Tab');
```

### `page.selectOption(selector, values, options?)`
Selecciona opciones en un select.
```typescript
await page.selectOption('#country', 'US');
await page.selectOption('#multi-select', ['option1', 'option2']);
```

### `page.check(selector, options?)` / `page.uncheck(selector, options?)`
Marca/desmarca checkboxes.
```typescript
await page.check('#terms');
await page.uncheck('#newsletter');
```

## Esperas

### `page.waitForURL(url, options?)`
Espera a que la URL cambie.
```typescript
await page.waitForURL('**/courses');
await page.waitForURL(/.*courses/);
await page.waitForURL('**/courses', { timeout: 10000 });
```
**Consideraciones:**
- `**` es un wildcard que matchea cualquier path
- Usar regex para patrones más complejos
- `timeout` en milisegundos

### `page.waitForLoadState(state, options?)`
Espera a que la página alcance un estado específico.
```typescript
await page.waitForLoadState('networkidle'); // No hay requests por 500ms
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('load');
```

### `page.waitForSelector(selector, options?)`
Espera a que un elemento aparezca.
```typescript
await page.waitForSelector('.loading-spinner', { state: 'hidden' });
await page.waitForSelector('#success-message', { state: 'visible' });
```

### `page.waitForFunction(pageFunction, arg?, options?)`
Espera a que una función retorne true.
```typescript
await page.waitForFunction(() => document.querySelector('.result') !== null);
```

## Aserciones

### `expect(page).toHaveURL(url)`
Verifica que la URL actual coincida.
```typescript
await expect(page).toHaveURL(/.*courses/);
await expect(page).toHaveURL('https://example.com/courses');
```

### `expect(page).toHaveTitle(title)`
Verifica el título de la página.
```typescript
await expect(page).toHaveTitle(/.*Courses/);
```

### `expect(page).toHaveScreenshot(name, options?)`
Verifica que la página coincida con una captura.
```typescript
await expect(page).toHaveScreenshot('homepage.png');
```

## Capturas y Videos

### `page.screenshot(options?)`
Toma una captura de pantalla.
```typescript
await page.screenshot({ path: 'screenshot.png' });
await page.screenshot({ fullPage: true });
```

### `page.pdf(options?)`
Genera un PDF de la página.
```typescript
await page.pdf({ path: 'document.pdf' });
```

## Evaluación de JavaScript

### `page.evaluate(pageFunction, arg?)`
Ejecuta JavaScript en el contexto de la página.
```typescript
const title = await page.evaluate(() => document.title);
const result = await page.evaluate((selector) => {
  return document.querySelector(selector).textContent;
}, '#result');
```

### `page.evaluateHandle(pageFunction, arg?)`
Ejecuta JavaScript y retorna un handle.
```typescript
const handle = await page.evaluateHandle(() => window);
```

## Eventos

### `page.on(event, handler)`
Escucha eventos de la página.
```typescript
page.on('console', msg => console.log(msg.text()));
page.on('dialog', dialog => dialog.accept());
```

## Consideraciones Importantes

1. **Siempre usar `await`** con métodos asíncronos
2. **Timeouts**: Configurar timeouts apropiados para operaciones lentas
3. **Esperas**: Usar `waitForURL`, `waitForSelector` para elementos dinámicos
4. **Selectores**: Preferir selectores estables (data-testid, roles ARIA)
5. **Exact matches**: Usar `exact: true` cuando sea necesario
6. **Force clicks**: Usar `force: true` solo cuando sea necesario
7. **Regex**: Usar regex para patrones de URL complejos
8. **Error handling**: Implementar manejo de errores apropiado
