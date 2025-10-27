# Métodos de API Request en Playwright - Guía Completa

## Requests HTTP

### `request.get(url, options?)`
Realiza una petición GET.
```typescript
const response = await request.get('/api/users');
const response = await request.get('https://api.example.com/users', {
  headers: { 'Authorization': 'Bearer token' }
});
```

### `request.post(url, options?)`
Realiza una petición POST.
```typescript
const response = await request.post('/api/users', {
  data: { name: 'John', email: 'john@example.com' }
});
const response = await request.post('/api/users', {
  data: JSON.stringify({ name: 'John' }),
  headers: { 'Content-Type': 'application/json' }
});
```

### `request.put(url, options?)`
Realiza una petición PUT.
```typescript
const response = await request.put('/api/users/1', {
  data: { name: 'John Updated' }
});
```

### `request.patch(url, options?)`
Realiza una petición PATCH.
```typescript
const response = await request.patch('/api/users/1', {
  data: { name: 'John Updated' }
});
```

### `request.delete(url, options?)`
Realiza una petición DELETE.
```typescript
const response = await request.delete('/api/users/1');
```

### `request.head(url, options?)`
Realiza una petición HEAD.
```typescript
const response = await request.head('/api/users');
```

## Opciones de Request

### Headers
```typescript
const response = await request.get('/api/users', {
  headers: {
    'Authorization': 'Bearer token123',
    'Content-Type': 'application/json',
    'X-Custom-Header': 'value'
  }
});
```

### Data (Body)
```typescript
// JSON data
const response = await request.post('/api/users', {
  data: { name: 'John', email: 'john@example.com' }
});

// Form data
const response = await request.post('/api/users', {
  data: new URLSearchParams({
    name: 'John',
    email: 'john@example.com'
  })
});

// Raw data
const response = await request.post('/api/users', {
  data: 'raw string data'
});
```

### Query Parameters
```typescript
const response = await request.get('/api/users', {
  params: {
    page: 1,
    limit: 10,
    search: 'john'
  }
});
```

### Timeout
```typescript
const response = await request.get('/api/users', {
  timeout: 30000 // 30 segundos
});
```

## Respuestas

### `response.status()`
Obtiene el código de estado HTTP.
```typescript
const response = await request.get('/api/users');
expect(response.status()).toBe(200);
```

### `response.statusText()`
Obtiene el texto del estado HTTP.
```typescript
const response = await request.get('/api/users');
expect(response.statusText()).toBe('OK');
```

### `response.headers()`
Obtiene los headers de la respuesta.
```typescript
const response = await request.get('/api/users');
const headers = response.headers();
expect(headers['content-type']).toBe('application/json');
```

### `response.headersArray()`
Obtiene los headers como array.
```typescript
const response = await request.get('/api/users');
const headers = response.headersArray();
```

### `response.url()`
Obtiene la URL de la respuesta.
```typescript
const response = await request.get('/api/users');
expect(response.url()).toBe('https://api.example.com/users');
```

## Contenido de la Respuesta

### `response.text()`
Obtiene el contenido como texto.
```typescript
const response = await request.get('/api/users');
const text = await response.text();
console.log(text);
```

### `response.json()`
Obtiene el contenido como JSON.
```typescript
const response = await request.get('/api/users');
const data = await response.json();
expect(data.users).toHaveLength(5);
```

### `response.body()`
Obtiene el contenido como Buffer.
```typescript
const response = await request.get('/api/users');
const buffer = await response.body();
```

## Aserciones de API

### `expect(response).toBeOK()`
Verifica que la respuesta sea exitosa (200-299).
```typescript
const response = await request.get('/api/users');
await expect(response).toBeOK();
```

### `expect(response).toHaveStatus(status)`
Verifica el código de estado.
```typescript
const response = await request.get('/api/users');
await expect(response).toHaveStatus(200);
```

### `expect(response).toHaveURL(url)`
Verifica la URL de la respuesta.
```typescript
const response = await request.get('/api/users');
await expect(response).toHaveURL('https://api.example.com/users');
```

### `expect(response).toHaveHeaders(headers)`
Verifica los headers de la respuesta.
```typescript
const response = await request.get('/api/users');
await expect(response).toHaveHeaders({
  'content-type': 'application/json'
});
```

## Interceptación de Requests

### `page.route(url, handler)`
Intercepta requests de la página.
```typescript
await page.route('**/api/**', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data: 'mocked' })
  });
});
```

### `page.route(url, handler, options?)`
Intercepta con opciones adicionales.
```typescript
await page.route('**/api/**', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data: 'mocked' })
  });
}, { times: 1 }); // Solo intercepta una vez
```

### `route.continue(options?)`
Continúa con el request original.
```typescript
await page.route('**/api/**', route => {
  const request = route.request();
  if (request.method() === 'GET') {
    route.continue();
  } else {
    route.fulfill({ status: 200, body: 'mocked' });
  }
});
```

### `route.fulfill(response)`
Responde con datos mockeados.
```typescript
await page.route('**/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ])
  });
});
```

### `route.abort(errorCode?)`
Aborta el request.
```typescript
await page.route('**/api/**', route => {
  route.abort('failed');
});
```

## Autenticación

### Basic Auth
```typescript
const response = await request.get('/api/users', {
  headers: {
    'Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64')
  }
});
```

### Bearer Token
```typescript
const response = await request.get('/api/users', {
  headers: {
    'Authorization': 'Bearer your-token-here'
  }
});
```

### API Key
```typescript
const response = await request.get('/api/users', {
  headers: {
    'X-API-Key': 'your-api-key'
  }
});
```

## Consideraciones Importantes

1. **Base URL**: Configurar `baseURL` en playwright.config.ts
2. **Timeouts**: Configurar timeouts apropiados para APIs lentas
3. **Error handling**: Implementar manejo de errores para requests fallidos
4. **Headers**: Incluir headers necesarios (Content-Type, Authorization)
5. **Data formats**: Usar el formato correcto para el body (JSON, FormData)
6. **Mocking**: Usar `page.route()` para mockear APIs en tests
7. **Assertions**: Usar aserciones específicas para APIs
8. **Performance**: Considerar el impacto de requests en tests
9. **Security**: No hardcodear credenciales en tests
10. **Cleanup**: Limpiar interceptores después de tests
