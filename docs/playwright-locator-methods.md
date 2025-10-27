# Métodos de Locator en Playwright - Guía Completa

## Localización de Elementos

### `locator(selector)`
Crea un locator para encontrar elementos.
```typescript
const button = page.locator('#submit-btn');
const links = page.locator('a');
const firstItem = page.locator('.item').first();
```

### `locator.first()` / `locator.last()`
Selecciona el primer/último elemento de una lista.
```typescript
await page.locator('.item').first().click();
await page.locator('.item').last().click();
```

### `locator.nth(index)`
Selecciona el elemento en una posición específica.
```typescript
await page.locator('.item').nth(2).click(); // Tercer elemento
await page.locator('tr').nth(0).click(); // Primera fila
```

### `locator.filter(options)`
Filtra elementos por condiciones.
```typescript
await page.locator('button').filter({ hasText: 'Save' }).click();
await page.locator('div').filter({ has: page.locator('.active') }).click();
```

## Interacciones

### `locator.click(options?)`
Hace click en el elemento.
```typescript
await page.locator('#button').click();
await page.locator('#button').click({ force: true });
await page.locator('#button').click({ button: 'right' }); // Click derecho
```

### `locator.dblclick(options?)`
Doble click en el elemento.
```typescript
await page.locator('.file').dblclick();
```

### `locator.hover(options?)`
Pasa el mouse sobre el elemento.
```typescript
await page.locator('.menu-item').hover();
```

### `locator.fill(value, options?)`
Llena un campo de texto.
```typescript
await page.locator('#email').fill('test@example.com');
await page.locator('input[name="password"]').fill('password123');
```

### `locator.type(text, options?)`
Escribe texto carácter por carácter.
```typescript
await page.locator('#search').type('playwright', { delay: 100 });
```

### `locator.press(key, options?)`
Presiona una tecla específica.
```typescript
await page.locator('#input').press('Enter');
await page.locator('#input').press('Tab');
```

### `locator.selectOption(values, options?)`
Selecciona opciones en un select.
```typescript
await page.locator('#country').selectOption('US');
await page.locator('#multi-select').selectOption(['option1', 'option2']);
```

### `locator.check(options?)` / `locator.uncheck(options?)`
Marca/desmarca checkboxes.
```typescript
await page.locator('#terms').check();
await page.locator('#newsletter').uncheck();
```

## Esperas

### `locator.waitFor(options?)`
Espera a que el elemento esté visible.
```typescript
await page.locator('.loading').waitFor({ state: 'hidden' });
await page.locator('#success').waitFor({ state: 'visible' });
```

### `locator.waitFor({ state: 'attached' })`
Espera a que el elemento esté en el DOM.
```typescript
await page.locator('#dynamic-content').waitFor({ state: 'attached' });
```

### `locator.waitFor({ state: 'detached' })`
Espera a que el elemento sea removido del DOM.
```typescript
await page.locator('.modal').waitFor({ state: 'detached' });
```

## Aserciones

### `expect(locator).toBeVisible()`
Verifica que el elemento sea visible.
```typescript
await expect(page.locator('#success-message')).toBeVisible();
```

### `expect(locator).toBeHidden()`
Verifica que el elemento esté oculto.
```typescript
await expect(page.locator('.loading')).toBeHidden();
```

### `expect(locator).toHaveText(text)`
Verifica el texto del elemento.
```typescript
await expect(page.locator('#status')).toHaveText('Success');
await expect(page.locator('#status')).toHaveText(/Success|Complete/);
```

### `expect(locator).toHaveValue(value)`
Verifica el valor de un input.
```typescript
await expect(page.locator('#email')).toHaveValue('test@example.com');
```

### `expect(locator).toHaveAttribute(name, value?)`
Verifica atributos del elemento.
```typescript
await expect(page.locator('#link')).toHaveAttribute('href', '/courses');
await expect(page.locator('#button')).toHaveAttribute('disabled');
```

### `expect(locator).toHaveClass(className)`
Verifica las clases CSS del elemento.
```typescript
await expect(page.locator('#item')).toHaveClass('active');
await expect(page.locator('#item')).toHaveClass(/active|selected/);
```

### `expect(locator).toHaveCount(count)`
Verifica la cantidad de elementos.
```typescript
await expect(page.locator('.item')).toHaveCount(5);
```

### `expect(locator).toBeEnabled()` / `expect(locator).toBeDisabled()`
Verifica si el elemento está habilitado/deshabilitado.
```typescript
await expect(page.locator('#submit')).toBeEnabled();
await expect(page.locator('#submit')).toBeDisabled();
```

### `expect(locator).toBeChecked()` / `expect(locator).toBeUnchecked()`
Verifica el estado de checkboxes/radio buttons.
```typescript
await expect(page.locator('#terms')).toBeChecked();
await expect(page.locator('#newsletter')).toBeUnchecked();
```

## Información del Elemento

### `locator.textContent()`
Obtiene el texto del elemento.
```typescript
const text = await page.locator('#title').textContent();
```

### `locator.innerText()`
Obtiene el texto visible del elemento.
```typescript
const visibleText = await page.locator('#content').innerText();
```

### `locator.innerHTML()`
Obtiene el HTML interno del elemento.
```typescript
const html = await page.locator('#container').innerHTML();
```

### `locator.getAttribute(name)`
Obtiene el valor de un atributo.
```typescript
const href = await page.locator('#link').getAttribute('href');
const id = await page.locator('#element').getAttribute('id');
```

### `locator.isVisible()`
Verifica si el elemento es visible.
```typescript
const isVisible = await page.locator('#modal').isVisible();
```

### `locator.isEnabled()`
Verifica si el elemento está habilitado.
```typescript
const isEnabled = await page.locator('#button').isEnabled();
```

### `locator.isChecked()`
Verifica si un checkbox/radio está marcado.
```typescript
const isChecked = await page.locator('#terms').isChecked();
```

## Operaciones con Múltiples Elementos

### `locator.count()`
Cuenta la cantidad de elementos.
```typescript
const itemCount = await page.locator('.item').count();
```

### `locator.all()`
Obtiene todos los elementos como array.
```typescript
const items = await page.locator('.item').all();
for (const item of items) {
  await item.click();
}
```

## Consideraciones Importantes

1. **Chaining**: Los locators se pueden encadenar: `page.locator('#container').locator('.item').first()`
2. **Auto-waiting**: Playwright espera automáticamente a que los elementos estén listos
3. **Strict mode**: Si hay múltiples elementos, Playwright falla (usa `.first()` si es necesario)
4. **Timeouts**: Configurar timeouts apropiados para elementos dinámicos
5. **Selectores**: Preferir selectores estables y específicos
6. **Performance**: Los locators son lazy, se evalúan cuando se usan
7. **Error handling**: Implementar manejo de errores para elementos que pueden no existir
