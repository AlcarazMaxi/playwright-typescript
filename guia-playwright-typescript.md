# Guía Práctica: Playwright con TypeScript

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn** como gestor de paquetes
- **Git** instalado
- **IDE** (VS Code recomendado)

## 🚀 Instalación Paso a Paso

### 1. Crear el Proyecto
```bash
# Crear directorio del proyecto
mkdir playwright-automation
cd playwright-automation

# Inicializar proyecto Node.js
npm init -y
```

### 2. Instalar Playwright
```bash
# Instalar Playwright
npm install @playwright/test

# Instalar tipos de TypeScript
npm install -D typescript @types/node

# Instalar Playwright browsers
npx playwright install
```

### 3. Configurar TypeScript
```bash
# Crear archivo tsconfig.json
npx tsc --init
```

### 4. Configurar Playwright
```bash
# Crear configuración de Playwright
npx playwright init --yes
```

## 📁 Estructura del Proyecto

```
playwright-automation/
├── tests/                    # Archivos de pruebas
│   ├── example.spec.ts      # Ejemplo básico
│   └── mi-prueba.spec.ts    # Tus pruebas
├── playwright.config.ts     # Configuración de Playwright
├── package.json             # Dependencias del proyecto
├── tsconfig.json           # Configuración de TypeScript
└── README.md               # Documentación
```

## ⚙️ Configuración Básica

### playwright.config.ts
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://example.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## 🎯 Comandos Principales

### Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar pruebas específicas
npx playwright test tests/mi-prueba.spec.ts

# Ejecutar en modo headed (ver navegador)
npx playwright test --headed

# Ejecutar en modo debug
npx playwright test --debug
```

### Generar Reportes
```bash
# Generar reporte HTML
npx playwright show-report

# Ver reporte después de ejecutar pruebas
npx playwright test --reporter=html
```

### Otros Comandos Útiles
```bash
# Instalar dependencias
npm install

# Actualizar Playwright
npx playwright update

# Generar código automáticamente
npx playwright codegen https://example.com
```

## 📝 Ejemplos Prácticos

### Ejemplo 1: Navegación Básica
```typescript
import { test, expect } from '@playwright/test';

test('navegación básica', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Ejemplo 2: Interacción con Elementos
```typescript
test('llenar formulario', async ({ page }) => {
  await page.goto('https://example.com/form');
  
  await page.fill('#nombre', 'Juan Pérez');
  await page.selectOption('#pais', 'Mexico');
  await page.check('#acepto-terminos');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.mensaje-exito')).toBeVisible();
});
```

### Ejemplo 3: Múltiples Páginas
```typescript
test('abrir nueva pestaña', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  
  await page1.goto('https://example.com');
  await page2.goto('https://google.com');
  
  await expect(page1).toHaveTitle(/Example/);
  await expect(page2).toHaveTitle(/Google/);
});
```

## 🔧 Scripts Útiles en package.json

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "test:ui": "playwright test --ui"
  }
}
```

## 🎨 Buenas Prácticas

### 1. Organización de Pruebas
```typescript
test.describe('Funcionalidad de Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login exitoso', async ({ page }) => {
    // Tu prueba aquí
  });

  test('login fallido', async ({ page }) => {
    // Tu prueba aquí
  });
});
```

### 2. Uso de Locators
```typescript
// ✅ Bueno - específico y estable
await page.getByRole('button', { name: 'Enviar' }).click();

// ❌ Evitar - frágil
await page.click('#btn-submit-123');
```

### 3. Esperas Inteligentes
```typescript
// ✅ Esperar por elemento específico
await page.waitForSelector('.resultado');

// ✅ Esperar por URL
await page.waitForURL('**/dashboard');

// ✅ Esperar por estado
await expect(page.locator('.loading')).toBeHidden();
```

## 🐛 Solución de Problemas Comunes

### Error: "Test timeout"
```typescript
// Aumentar timeout para prueba específica
test('prueba lenta', async ({ page }) => {
  test.setTimeout(60000); // 60 segundos
  // Tu prueba aquí
});
```

### Error: "Element not found"
```typescript
// Usar waitForSelector antes de interactuar
await page.waitForSelector('#mi-elemento');
await page.click('#mi-elemento');
```

### Error: "Browser not found"
```bash
# Reinstalar browsers
npx playwright install
```

## 📚 Recursos Adicionales

- [Documentación oficial de Playwright](https://playwright.dev/)
- [Playwright TypeScript API](https://playwright.dev/docs/api/class-playwright)
- [Ejemplos de código](https://github.com/microsoft/playwright/tree/main/tests)

## 🎯 Comandos de Ayuda Memoria

```bash
# Comandos más usados
npx playwright test                    # Ejecutar pruebas
npx playwright test --headed          # Ver navegador
npx playwright test --debug           # Modo debug
npx playwright show-report            # Ver reporte
npx playwright codegen [url]          # Generar código
npx playwright install                 # Instalar browsers
```

---

**💡 Tip**: Usa `npx playwright test --ui` para una interfaz gráfica que facilita la creación y depuración de pruebas.
