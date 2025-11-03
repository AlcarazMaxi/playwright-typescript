# Tabla Dinámica - Plan de Pruebas Completo

## Resumen Ejecutivo

Este documento describe el plan de pruebas completo para la **Tabla Dinámica** en la página de Automation Sandbox. La tabla dinámica se caracteriza por generar datos que cambian cada vez que se recarga la página, lo que requiere estrategias de testing específicas que validen el comportamiento dinámico sin depender de valores específicos.

**URL Base:** `http://localhost:3000/sandbox-automation-testing`

**Localización de la tabla:** `h2:has-text("Tabla dinámica") + table`

**Características principales:**
- Los valores en las columnas cambian al recargar la página
- Estructura HTML estándar con `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`
- Múltiples columnas con diferentes tipos de datos
- Comportamiento consistente pero con valores variables

---

## Test Scenarios

### 1. Validación de Estructura y Presencia

#### 1.1 Verificar que la tabla dinámica está presente y visible

**Seed:** `tests/seed.spec.ts` (si es necesario)

**Pasos:**
1. Navegar a la página de Automation Sandbox (`page.goto('')`)
2. Desplazarse o esperar hasta que la sección "Tabla dinámica" sea visible
3. Localizar la tabla usando el selector: `h2:has-text("Tabla dinámica") + table`
4. Verificar que la tabla es visible en la página

**Resultados Esperados:**
- La tabla está presente en el DOM
- La tabla es visible para el usuario
- El header "Tabla dinámica" es visible y correcto
- No hay errores de renderizado

**Criterios de Éxito:**
- `tableLocator.isVisible()` retorna `true`
- El elemento tabla existe en el DOM

---

#### 1.2 Verificar estructura HTML de la tabla (thead, tbody, filas, columnas)

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Verificar la presencia de `<thead>` con headers
4. Verificar la presencia de `<tbody>` con filas de datos
5. Contar el número de columnas en el header
6. Contar el número de filas en el tbody
7. Verificar que todas las filas tienen el mismo número de columnas

**Resultados Esperados:**
- La tabla tiene estructura `<thead>` con headers visibles
- La tabla tiene estructura `<tbody>` con al menos una fila
- Todas las filas tienen el mismo número de columnas que el header
- El número de columnas es consistente en todas las filas

**Criterios de Éxito:**
- `tableLocator.locator('thead').isVisible()` retorna `true`
- `tableLocator.locator('tbody tr').count()` > 0
- Todas las filas tienen el mismo número de `<td>` que columnas en `<thead>`

---

#### 1.3 Verificar headers de las columnas

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Localizar todos los headers (`thead th` o `thead tr th`)
4. Leer el texto de cada header
5. Verificar que los headers no están vacíos
6. Verificar que los headers son únicos (si aplica)

**Resultados Esperados:**
- Los headers están presentes y son visibles
- Cada header tiene texto descriptivo
- Los headers están correctamente formateados
- El número de headers es consistente

**Criterios de Éxito:**
- `tableLocator.locator('thead th').count()` > 0
- Todos los headers tienen texto no vacío
- Los headers son legibles y descriptivos

---

### 2. Validación de Datos Dinámicos

#### 2.1 Verificar que los valores cambian al recargar la página

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Seleccionar una columna específica (ej: segunda columna `tbody tr td:nth-child(2)`)
4. Esperar a que la columna sea visible
5. Leer todos los valores de la columna y almacenarlos
6. Normalizar los valores (trim de espacios)
7. Recargar la página (`page.reload()`)
8. Volver a localizar la tabla y la misma columna
9. Leer los nuevos valores de la columna después del reload
10. Normalizar los nuevos valores
11. Comparar que los valores son diferentes

**Resultados Esperados:**
- Los valores antes del reload son diferentes a los valores después del reload
- La tabla se renderiza correctamente después del reload
- Los valores siguen el mismo formato/estructura

**Criterios de Éxito:**
- `expect(valuesBeforeReload).not.toEqual(valuesAfterReload)` pasa
- La tabla está visible después del reload
- El número de filas se mantiene (si aplica)

**Nota:** Este es el comportamiento clave de la tabla dinámica que debe validarse.

---

#### 2.2 Verificar que todas las columnas tienen datos (no vacías)

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Obtener el número total de columnas desde el header
4. Para cada columna (índice 1 a N):
   - Localizar todas las celdas de esa columna
   - Leer los valores de todas las celdas
   - Verificar que ninguna celda está vacía
   - Verificar que los valores tienen contenido válido

**Resultados Esperados:**
- Todas las columnas tienen datos
- Ninguna celda está completamente vacía
- Los valores son consistentes en formato dentro de cada columna

**Criterios de Éxito:**
- `columnCells.allTextContents()` no contiene strings vacíos
- Todas las celdas tienen al menos un carácter de contenido
- El número de valores coincide con el número de filas

---

#### 2.3 Validar formato y tipo de datos por columna

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Identificar cada columna y su header
4. Para cada columna:
   - Leer todos los valores de la columna
   - Analizar el formato de los valores (números, texto, fechas, etc.)
   - Verificar que todos los valores en la columna siguen el mismo formato
   - Validar que el formato es apropiado según el header

**Resultados Esperados:**
- Cada columna tiene un formato consistente
- Los valores coinciden con el tipo esperado según el header
- No hay valores con formato incorrecto o mixto

**Criterios de Éxito:**
- Si la columna es numérica, todos los valores son números válidos
- Si la columna es de texto, todos los valores son strings válidos
- El formato es consistente dentro de cada columna

---

### 3. Validación de Columnas Específicas

#### 3.1 Validar la primera columna

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Localizar la primera columna: `tbody tr td:nth-child(1)`
4. Esperar a que al menos la primera celda sea visible
5. Leer todos los valores de la primera columna
6. Normalizar los valores (trim)
7. Verificar que los valores no están vacíos
8. Verificar formato y consistencia de los valores
9. Recargar la página y verificar que los valores cambian

**Resultados Esperados:**
- La primera columna tiene datos válidos
- Los valores son consistentes en formato
- Los valores cambian al recargar (comportamiento dinámico)

**Criterios de Éxito:**
- `firstColumnValues.length > 0`
- Todos los valores son no vacíos después de trim
- Los valores antes y después del reload son diferentes

---

#### 3.2 Validar la segunda columna

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Localizar la segunda columna: `tbody tr td:nth-child(2)`
4. Esperar a que al menos la primera celda sea visible
5. Leer todos los valores de la segunda columna
6. Normalizar los valores (trim)
7. Verificar que los valores no están vacíos
8. Recargar la página
9. Leer los nuevos valores de la segunda columna
10. Verificar que los valores son diferentes

**Resultados Esperados:**
- La segunda columna tiene datos válidos
- Los valores cambian al recargar la página
- El comportamiento dinámico funciona correctamente

**Criterios de Éxito:**
- `expect(secondColumnValuesBefore).not.toEqual(secondColumnValuesAfter)` pasa
- Todos los valores son no vacíos

**Nota:** Este escenario ya está parcialmente implementado en `AutomationSandbox.spec.ts` línea 288.

---

#### 3.3 Validar la tercera columna (si existe)

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Verificar cuántas columnas tiene la tabla
4. Si existe una tercera columna:
   - Localizar la tercera columna: `tbody tr td:nth-child(3)`
   - Esperar a que sea visible
   - Leer todos los valores
   - Normalizar y validar
   - Recargar y verificar cambios

**Resultados Esperados:**
- Si la tercera columna existe, tiene datos válidos
- Los valores cambian al recargar (si es dinámica)

**Criterios de Éxito:**
- Si `columnCount >= 3`, la tercera columna tiene datos válidos
- Los valores cambian al recargar

---

### 4. Casos Edge y Validaciones Adicionales

#### 4.1 Verificar comportamiento con múltiples recargas

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Seleccionar una columna específica
4. Leer valores iniciales
5. Recargar la página (1ra vez)
6. Leer valores después de 1ra recarga
7. Recargar la página (2da vez)
8. Leer valores después de 2da recarga
9. Verificar que cada recarga genera valores diferentes (o al menos que no siempre son iguales)

**Resultados Esperados:**
- Cada recarga genera nuevos valores
- La tabla se renderiza correctamente después de cada recarga
- No hay errores de JavaScript o renderizado

**Criterios de Éxito:**
- Los valores cambian en al menos una de las recargas
- La tabla permanece visible y funcional después de múltiples recargas

---

#### 4.2 Verificar número de filas se mantiene consistente

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Contar el número de filas en el tbody
4. Recargar la página
5. Volver a contar el número de filas
6. Verificar que el número de filas es el mismo (o dentro de un rango esperado)

**Resultados Esperados:**
- El número de filas es consistente entre recargas
- O el número de filas varía dentro de un rango esperado y documentado

**Criterios de Éxito:**
- `rowsBeforeReload === rowsAfterReload` (si la tabla tiene filas fijas)
- O `rowsAfterReload` está dentro del rango esperado (si varía)

---

#### 4.3 Verificar que la tabla es accesible y responsive

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Verificar que la tabla es accesible mediante teclado
4. Verificar que los headers tienen atributos de accesibilidad apropiados
5. Verificar que la tabla se renderiza correctamente en diferentes viewports (opcional)

**Resultados Esperados:**
- La tabla es accesible mediante navegación por teclado
- Los headers están correctamente marcados semánticamente
- La tabla es responsive (si aplica)

**Criterios de Éxito:**
- La tabla tiene estructura semántica correcta (`<table>`, `<thead>`, `<tbody>`)
- Los headers están en `<th>` dentro de `<thead>`
- La tabla es navegable con teclado

---

#### 4.4 Verificar rendimiento de carga de la tabla

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Medir el tiempo hasta que la tabla sea visible
3. Medir el tiempo hasta que todos los datos estén cargados
4. Verificar que los tiempos son aceptables (< 3 segundos típicamente)

**Resultados Esperados:**
- La tabla se carga en un tiempo razonable
- No hay delays excesivos en la renderización

**Criterios de Éxito:**
- `tableLocator.first().waitFor({ state: 'visible' })` completa en < 3 segundos
- La tabla está completamente renderizada en tiempo aceptable

---

### 5. Validaciones de Integridad de Datos

#### 5.1 Verificar que no hay valores duplicados en una columna (si aplica)

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Para cada columna:
   - Leer todos los valores
   - Verificar si hay duplicados
   - Validar según los requisitos (algunas columnas pueden tener duplicados, otras no)

**Resultados Esperados:**
- Los valores cumplen con las reglas de unicidad esperadas
- Si una columna debe ser única, no hay duplicados
- Si una columna puede tener duplicados, está documentado

**Criterios de Éxito:**
- Según los requisitos de negocio de cada columna

---

#### 5.2 Verificar relaciones entre columnas (si aplica)

**Pasos:**
1. Navegar a la página de Automation Sandbox
2. Localizar la tabla dinámica
3. Leer valores de múltiples columnas relacionadas
4. Verificar que las relaciones entre columnas son válidas
5. Validar cualquier regla de negocio que aplique entre columnas

**Resultados Esperados:**
- Las relaciones entre columnas son válidas
- Los datos son consistentes entre columnas relacionadas

**Criterios de Éxito:**
- Según las reglas de negocio específicas de la aplicación

---

## Estrategias de Testing Recomendadas

### Patrón de Localización

```typescript
// Localizar la tabla usando selector relativo al header
const tableLocator = page.locator('h2:has-text("Tabla dinámica") + table');

// Localizar una columna específica
const columnLocator = tableLocator.locator('tbody tr td:nth-child(N)'); // N = número de columna

// Localizar una fila específica
const rowLocator = tableLocator.locator('tbody tr:nth-child(N)'); // N = número de fila
```

### Patrón de Lectura y Normalización

```typescript
// Esperar a que la columna sea visible
await columnLocator.first().waitFor({ state: 'visible' });

// Leer todos los valores
const rawValues: string[] = await columnLocator.allTextContents();

// Normalizar (trim de espacios)
const normalizedValues: string[] = rawValues.map(val => val.trim());
```

### Patrón de Validación Dinámica

```typescript
// Leer valores antes del reload
const valuesBefore = await columnLocator.allTextContents();
const normalizedBefore = valuesBefore.map(v => v.trim());

// Recargar la página
await page.reload();

// Esperar a que la tabla se vuelva a renderizar
await tableLocator.locator('tbody tr').first().waitFor({ state: 'visible' });

// Leer valores después del reload
const valuesAfter = await columnLocator.allTextContents();
const normalizedAfter = valuesAfter.map(v => v.trim());

// Validar que son diferentes
expect(normalizedBefore).not.toEqual(normalizedAfter);
```

---

## Criterios de Aceptación General

1. ✅ La tabla dinámica está presente y visible en la página
2. ✅ La tabla tiene estructura HTML válida (thead, tbody, filas, columnas)
3. ✅ Los valores en las columnas cambian al recargar la página
4. ✅ Todas las columnas tienen datos (no vacías)
5. ✅ El formato de datos es consistente dentro de cada columna
6. ✅ La tabla se renderiza correctamente después de múltiples recargas
7. ✅ El número de filas es consistente (o varía dentro del rango esperado)
8. ✅ La tabla es accesible y tiene estructura semántica correcta
9. ✅ La tabla carga en un tiempo razonable (< 3 segundos)

---

## Notas de Implementación

- **Seed:** Si es necesario un estado inicial específico, usar `tests/seed.spec.ts`
- **Selectores:** Preferir selectores relativos al header para mayor robustez
- **Esperas:** Siempre esperar a que los elementos sean visibles antes de interactuar
- **Normalización:** Siempre hacer trim de los valores para evitar problemas con espacios
- **Logging:** Usar `console.log()` para debug de valores durante el desarrollo
- **Screenshots:** Considerar adjuntar screenshots en caso de fallos para debugging

---

## Priorización de Escenarios

### Alta Prioridad (P0)
- 1.1 Verificar que la tabla está presente
- 1.2 Verificar estructura HTML
- 2.1 Verificar que los valores cambian al recargar
- 2.2 Verificar que todas las columnas tienen datos

### Media Prioridad (P1)
- 1.3 Verificar headers de columnas
- 2.3 Validar formato y tipo de datos
- 3.1, 3.2 Validar columnas específicas
- 4.2 Verificar número de filas consistente

### Baja Prioridad (P2)
- 4.1 Múltiples recargas
- 4.3 Accesibilidad
- 4.4 Rendimiento
- 5.1, 5.2 Validaciones de integridad avanzadas

---

## Próximos Pasos

1. Implementar los escenarios de alta prioridad (P0)
2. Ejecutar los tests y validar que pasan
3. Implementar escenarios de media prioridad (P1)
4. Refinar y ajustar según resultados
5. Documentar cualquier comportamiento específico descubierto durante la implementación

