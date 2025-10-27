# Fixtures y Hooks en Playwright - Guía Completa

## Fixtures Básicos

### `test.beforeAll(callback)`
Ejecuta código antes de todos los tests en el archivo.
```typescript
test.beforeAll(async () => {
  console.log('Setting up test suite');
  // Configuración global para todos los tests
});
```

### `test.afterAll(callback)`
Ejecuta código después de todos los tests en el archivo.
```typescript
test.afterAll(async () => {
  console.log('Cleaning up test suite');
  // Limpieza global
});
```

### `test.beforeEach(callback)`
Ejecuta código antes de cada test.
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
  // Configuración antes de cada test
});
```

### `test.afterEach(callback)`
Ejecuta código después de cada test.
```typescript
test.afterEach(async ({ page }) => {
  // Limpieza después de cada test
  await page.close();
});
```

## Fixtures de Playwright

### `{ page }`
Página de navegador para interactuar con la web.
```typescript
test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('#button');
});
```

### `{ browser }`
Instancia del navegador.
```typescript
test('browser test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Usar página
  await context.close();
});
```

### `{ context }`
Contexto de navegador.
```typescript
test('context test', async ({ context }) => {
  const page = await context.newPage();
  await page.goto('https://example.com');
});
```

### `{ request }`
API para hacer requests HTTP.
```typescript
test('API test', async ({ request }) => {
  const response = await request.get('/api/users');
  expect(response.status()).toBe(200);
});
```

## Fixtures Personalizados

### Definir un fixture personalizado
```typescript
import { test as base } from '@playwright/test';

type MyFixtures = {
  myPage: Page;
  myData: string;
};

const test = base.extend<MyFixtures>({
  myPage: async ({ page }, use) => {
    await page.goto('https://example.com');
    await use(page);
  },
  myData: async ({}, use) => {
    const data = 'test data';
    await use(data);
  }
});

test('custom fixture test', async ({ myPage, myData }) => {
  await myPage.click('#button');
  console.log(myData);
});
```

### Fixture con setup y teardown
```typescript
const test = base.extend<MyFixtures>({
  database: async ({}, use) => {
    // Setup
    const db = await setupDatabase();
    await use(db);
    // Teardown
    await cleanupDatabase(db);
  }
});
```

## Hooks de Test

### `test.step(name, callback)`
Organiza el test en pasos legibles.
```typescript
test('user registration', async ({ page }) => {
  await test.step('Navigate to registration page', async () => {
    await page.goto('/register');
  });
  
  await test.step('Fill registration form', async () => {
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
  });
  
  await test.step('Submit form', async () => {
    await page.click('#submit');
  });
});
```

### `test.step.skip(name, callback)`
Omite un paso del test.
```typescript
test('conditional test', async ({ page }) => {
  await test.step('Always run', async () => {
    await page.goto('/');
  });
  
  await test.step.skip('Skip this step', async () => {
    // Este paso se omite
  });
});
```

## Configuración de Tests

### `test.describe(name, callback)`
Agrupa tests relacionados.
```typescript
test.describe('User Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    // Test implementation
  });
  
  test('should show error with invalid credentials', async ({ page }) => {
    // Test implementation
  });
});
```

### `test.describe.configure(options)`
Configura opciones para un grupo de tests.
```typescript
test.describe('Slow tests', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('first test', async ({ page }) => {
    // Tests se ejecutan en serie
  });
});
```

### `test.describe.serial(name, callback)`
Ejecuta tests en serie.
```typescript
test.describe.serial('Database tests', () => {
  test('create user', async ({ page }) => {
    // Test 1
  });
  
  test('update user', async ({ page }) => {
    // Test 2 - depende del anterior
  });
});
```

### `test.describe.parallel(name, callback)`
Ejecuta tests en paralelo (por defecto).
```typescript
test.describe.parallel('Independent tests', () => {
  test('test 1', async ({ page }) => {
    // Test independiente
  });
  
  test('test 2', async ({ page }) => {
    // Test independiente
  });
});
```

## Configuración de Tests Individuales

### `test.skip(condition, name, callback)`
Omite un test condicionalmente.
```typescript
test.skip(process.env.CI, 'Skip in CI', async ({ page }) => {
  // Test que se omite en CI
});
```

### `test.fixme(name, callback)`
Marca un test como roto temporalmente.
```typescript
test.fixme('broken test', async ({ page }) => {
  // Test que está roto
});
```

### `test.slow(name, callback)`
Marca un test como lento.
```typescript
test.slow('slow test', async ({ page }) => {
  // Test que toma mucho tiempo
});
```

### `test.only(name, callback)`
Ejecuta solo este test.
```typescript
test.only('focused test', async ({ page }) => {
  // Solo este test se ejecuta
});
```

## Configuración de Timeouts

### `test.setTimeout(timeout)`
Establece timeout para el test.
```typescript
test.setTimeout(60000); // 60 segundos
test('long test', async ({ page }) => {
  // Test que puede tomar tiempo
});
```

### `test.slow()`
Configuración para tests lentos.
```typescript
test.slow('slow test', async ({ page }) => {
  // Timeout automáticamente aumentado
});
```

## Consideraciones Importantes

1. **Setup/Teardown**: Usar hooks apropiados para configuración y limpieza
2. **Fixtures**: Crear fixtures reutilizables para datos comunes
3. **Isolation**: Cada test debe ser independiente
4. **Performance**: Usar `test.describe.parallel()` cuando sea posible
5. **Debugging**: Usar `test.only()` para enfocar en tests específicos
6. **Conditional tests**: Usar `test.skip()` para tests condicionales
7. **Timeouts**: Configurar timeouts apropiados para tests lentos
8. **Error handling**: Implementar manejo de errores en hooks
9. **Resource cleanup**: Siempre limpiar recursos en `afterEach`/`afterAll`
10. **Test organization**: Usar `test.describe()` para agrupar tests relacionados
