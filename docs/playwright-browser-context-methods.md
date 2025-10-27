# Métodos de Browser y BrowserContext en Playwright - Guía Completa

## Browser

### `browser.newContext(options?)`
Crea un nuevo contexto de navegador.
```typescript
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  userAgent: 'Custom User Agent',
  locale: 'es-ES',
  timezoneId: 'America/New_York'
});
```

### `browser.newPage(options?)`
Crea una nueva página en el contexto por defecto.
```typescript
const page = await browser.newPage();
```

### `browser.contexts()`
Obtiene todos los contextos activos.
```typescript
const contexts = browser.contexts();
```

### `browser.close()`
Cierra el navegador y todos sus contextos.
```typescript
await browser.close();
```

### `browser.isConnected()`
Verifica si el navegador está conectado.
```typescript
const isConnected = browser.isConnected();
```

## BrowserContext

### `context.newPage()`
Crea una nueva página en el contexto.
```typescript
const page = await context.newPage();
```

### `context.pages()`
Obtiene todas las páginas del contexto.
```typescript
const pages = context.pages();
```

### `context.close()`
Cierra el contexto y todas sus páginas.
```typescript
await context.close();
```

## Configuración del Contexto

### `context.setViewportSize(size)`
Establece el tamaño de la ventana.
```typescript
await context.setViewportSize({ width: 1920, height: 1080 });
```

### `context.setGeolocation(geolocation)`
Establece la geolocalización.
```typescript
await context.setGeolocation({ latitude: 40.7128, longitude: -74.0060 });
```

### `context.setExtraHTTPHeaders(headers)`
Establece headers HTTP adicionales.
```typescript
await context.setExtraHTTPHeaders({
  'Authorization': 'Bearer token123',
  'X-Custom-Header': 'value'
});
```

### `context.setUserAgent(userAgent)`
Establece el User Agent.
```typescript
await context.setUserAgent('Mozilla/5.0 (Custom Browser)');
```

## Cookies y Storage

### `context.addCookies(cookies)`
Agrega cookies al contexto.
```typescript
await context.addCookies([
  {
    name: 'session',
    value: 'abc123',
    domain: 'example.com',
    path: '/',
    httpOnly: true,
    secure: true
  }
]);
```

### `context.cookies(urls?)`
Obtiene las cookies del contexto.
```typescript
const cookies = await context.cookies();
const specificCookies = await context.cookies(['https://example.com']);
```

### `context.clearCookies()`
Limpia todas las cookies.
```typescript
await context.clearCookies();
```

### `context.clearPermissions()`
Limpia todos los permisos.
```typescript
await context.clearPermissions();
```

## Permisos

### `context.grantPermissions(permissions, options?)`
Otorga permisos al contexto.
```typescript
await context.grantPermissions(['camera', 'microphone']);
await context.grantPermissions(['geolocation'], { origin: 'https://example.com' });
```

### `context.clearPermissions()`
Limpia todos los permisos.
```typescript
await context.clearPermissions();
```

## Interceptación de Requests

### `context.route(url, handler)`
Intercepta requests que coincidan con el patrón.
```typescript
await context.route('**/api/**', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data: 'mocked' })
  });
});
```

### `context.unroute(url?, handler?)`
Remueve interceptores de requests.
```typescript
await context.unroute('**/api/**');
```

## Eventos del Contexto

### `context.on(event, handler)`
Escucha eventos del contexto.
```typescript
context.on('page', page => {
  console.log('New page created');
});

context.on('close', () => {
  console.log('Context closed');
});
```

## Autenticación

### `context.setHTTPCredentials(credentials)`
Establece credenciales HTTP básicas.
```typescript
await context.setHTTPCredentials({
  username: 'user',
  password: 'pass'
});
```

## Consideraciones Importantes

1. **Aislamiento**: Cada contexto es aislado (cookies, storage, etc.)
2. **Performance**: Crear contextos es más rápido que crear browsers
3. **Recursos**: Cerrar contextos libera memoria
4. **Cookies**: Se comparten entre páginas del mismo contexto
5. **Storage**: LocalStorage y SessionStorage son por contexto
6. **Permisos**: Se aplican a todo el contexto
7. **Interceptación**: Los route handlers se aplican a todas las páginas del contexto
8. **Timeouts**: Configurar timeouts apropiados para operaciones lentas
9. **Cleanup**: Siempre cerrar contextos cuando no se necesiten
10. **Error handling**: Implementar manejo de errores para operaciones de contexto
