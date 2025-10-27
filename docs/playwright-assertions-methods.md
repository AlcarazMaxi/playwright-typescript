# Métodos de Aserciones (Expect) en Playwright - Guía Completa

## Aserciones de Página

### `expect(page).toHaveURL(url)`
Verifica que la URL actual coincida.
```typescript
await expect(page).toHaveURL('https://example.com/courses');
await expect(page).toHaveURL(/.*courses/);
await expect(page).toHaveURL('**/courses');
```

### `expect(page).toHaveTitle(title)`
Verifica el título de la página.
```typescript
await expect(page).toHaveTitle('Courses - Example');
await expect(page).toHaveTitle(/.*Courses/);
```

### `expect(page).toHaveScreenshot(name, options?)`
Verifica que la página coincida con una captura.
```typescript
await expect(page).toHaveScreenshot('homepage.png');
await expect(page).toHaveScreenshot('mobile-view.png', { 
  fullPage: true,
  animations: 'disabled'
});
```

## Aserciones de Locator

### `expect(locator).toBeVisible()`
Verifica que el elemento sea visible.
```typescript
await expect(page.locator('#success-message')).toBeVisible();
```

### `expect(locator).toBeHidden()`
Verifica que el elemento esté oculto.
```typescript
await expect(page.locator('.loading-spinner')).toBeHidden();
```

### `expect(locator).toHaveText(text)`
Verifica el texto del elemento.
```typescript
await expect(page.locator('#status')).toHaveText('Success');
await expect(page.locator('#status')).toHaveText(/Success|Complete/);
await expect(page.locator('#status')).toHaveText(['Success', 'Complete']);
```

### `expect(locator).toHaveValue(value)`
Verifica el valor de un input.
```typescript
await expect(page.locator('#email')).toHaveValue('test@example.com');
await expect(page.locator('#email')).toHaveValue(/.*@example\.com/);
```

### `expect(locator).toHaveAttribute(name, value?)`
Verifica atributos del elemento.
```typescript
await expect(page.locator('#link')).toHaveAttribute('href', '/courses');
await expect(page.locator('#link')).toHaveAttribute('href', /.*courses/);
await expect(page.locator('#button')).toHaveAttribute('disabled');
```

### `expect(locator).toHaveClass(className)`
Verifica las clases CSS del elemento.
```typescript
await expect(page.locator('#item')).toHaveClass('active');
await expect(page.locator('#item')).toHaveClass(/active|selected/);
await expect(page.locator('#item')).toHaveClass(['active', 'highlighted']);
```

### `expect(locator).toHaveCount(count)`
Verifica la cantidad de elementos.
```typescript
await expect(page.locator('.item')).toHaveCount(5);
await expect(page.locator('.item')).toHaveCount(0); // No hay elementos
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

### `expect(locator).toBeFocused()`
Verifica si el elemento tiene el foco.
```typescript
await expect(page.locator('#search-input')).toBeFocused();
```

### `expect(locator).toBeInViewport()`
Verifica si el elemento está visible en el viewport.
```typescript
await expect(page.locator('#footer')).toBeInViewport();
```

## Aserciones de API Response

### `expect(response).toBeOK()`
Verifica que la respuesta HTTP sea exitosa (200-299).
```typescript
const response = await page.request.get('/api/users');
await expect(response).toBeOK();
```

### `expect(response).toHaveStatus(status)`
Verifica el código de estado HTTP.
```typescript
await expect(response).toHaveStatus(200);
await expect(response).toHaveStatus(404);
```

### `expect(response).toHaveURL(url)`
Verifica la URL de la respuesta.
```typescript
await expect(response).toHaveURL('https://api.example.com/users');
```

### `expect(response).toHaveHeaders(headers)`
Verifica los headers de la respuesta.
```typescript
await expect(response).toHaveHeaders({
  'content-type': 'application/json'
});
```

## Aserciones de Console

### `expect(consoleMessage).toBeOfType(type)`
Verifica el tipo de mensaje de consola.
```typescript
page.on('console', msg => {
  expect(msg).toBeOfType('error');
});
```

## Aserciones de Download

### `expect(download).toHaveFilename(filename)`
Verifica el nombre del archivo descargado.
```typescript
const download = await page.waitForEvent('download');
await expect(download).toHaveFilename('document.pdf');
```

### `expect(download).toHavePath(path)`
Verifica la ruta del archivo descargado.
```typescript
await expect(download).toHavePath(/.*\.pdf$/);
```

## Aserciones de Dialog

### `expect(dialog).toBeOfType(type)`
Verifica el tipo de diálogo.
```typescript
page.on('dialog', dialog => {
  expect(dialog).toBeOfType('alert');
});
```

## Opciones de Aserciones

### `expect(locator).toBeVisible({ timeout: 5000 })`
Configura el timeout de la aserción.
```typescript
await expect(page.locator('#slow-element')).toBeVisible({ timeout: 10000 });
```

### `expect(locator).toHaveText(text, { ignoreCase: true })`
Ignora mayúsculas/minúsculas.
```typescript
await expect(page.locator('#title')).toHaveText('SUCCESS', { ignoreCase: true });
```

### `expect(locator).toHaveScreenshot(name, { threshold: 0.2 })`
Configura la sensibilidad de comparación de imágenes.
```typescript
await expect(page.locator('#chart')).toHaveScreenshot('chart.png', { 
  threshold: 0.1,
  maxDiffPixels: 100
});
```

## Aserciones Personalizadas

### `expect(locator).toPass(callback)`
Ejecuta una función personalizada hasta que pase.
```typescript
await expect(page.locator('#status')).toPass(async () => {
  const text = await page.locator('#status').textContent();
  expect(text).toBe('Complete');
});
```

## Consideraciones Importantes

1. **Auto-waiting**: Las aserciones esperan automáticamente a que las condiciones se cumplan
2. **Timeouts**: Configurar timeouts apropiados para elementos dinámicos
3. **Regex**: Usar regex para patrones flexibles de texto/URLs
4. **Arrays**: Usar arrays para múltiples valores esperados
5. **Screenshots**: Configurar threshold para comparaciones de imágenes
6. **Performance**: Las aserciones con screenshots son más lentas
7. **Error messages**: Los mensajes de error son descriptivos por defecto
8. **Soft assertions**: Usar `expect.soft()` para no fallar el test inmediatamente
9. **Custom matchers**: Crear matchers personalizados para casos específicos
10. **Debugging**: Usar `--debug` para ver el estado de las aserciones
