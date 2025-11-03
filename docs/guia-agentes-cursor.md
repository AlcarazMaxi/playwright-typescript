# Guía: Modelos y Agentes de Playwright en Cursor

## Cómo cambiar el modelo de IA

Para seleccionar entre diferentes modelos (Claude Sonnet, GPT-4, etc.):

1. **Desde el panel de chat:**
   - Abre el chat (Ctrl + L o clic en el icono de chat)
   - Haz clic en el dropdown del modelo en la parte inferior del panel de chat
   - Selecciona el modelo deseado (Claude Sonnet, GPT-4, etc.)

2. **Desde la configuración:**
   - Presiona `Ctrl + ,` (o `Cmd + ,` en Mac) para abrir Settings
   - Busca "model" o "AI model"
   - Configura tu modelo preferido

## Cómo usar los Agentes de Playwright

Cursor puede usar "chat modes" (modos de chat) que son agentes especializados. Para acceder a ellos:

### Método 1: Desde el chat
1. Abre el chat (Ctrl + L)
2. En el campo de entrada, escribe `/` seguido del nombre del agente, o
3. Haz clic en el icono `@` en el campo de entrada para ver todos los agentes disponibles

### Método 2: Desde la paleta de comandos
1. Presiona `Ctrl + Shift + P` (o `Cmd + Shift + P` en Mac)
2. Escribe "Chat Mode" o "Agent"
3. Selecciona el agente que necesites

## Agentes de Playwright Disponibles

Tu proyecto tiene configurados 3 agentes especializados en `.github/chatmodes/`:

### 🎭 Planner (Planificador)
**Cuándo usarlo:** Cuando necesitas crear un plan de pruebas completo para una aplicación web.

**Descripción:** Este agente explora tu aplicación y crea escenarios de prueba detallados cubriendo:
- Happy paths (flujos normales)
- Edge cases (casos límite)
- Manejo de errores y validaciones

**Ejemplo de uso:**
```
/planner Necesito crear escenarios de prueba para la nueva página de checkout
```

### 🎭 Generator (Generador)
**Cuándo usarlo:** Cuando necesitas generar tests automatizados de Playwright.

**Descripción:** Este agente toma un plan de pruebas y genera código de Playwright ejecutable. Puede:
- Ejecutar acciones en el navegador en tiempo real
- Generar tests basados en los pasos del plan
- Crear archivos de test listos para usar

**Ejemplo de uso:**
```
/generator Genera un test para el login con usuario admin@test.com
```

### 🎭 Healer (Sanador)
**Cuándo usarlo:** Cuando tienes tests que están fallando y necesitas debuggear.

**Descripción:** Este agente diagnostica y repara tests rotos:
- Ejecuta los tests y detecta fallos
- Analiza el error paso a paso
- Corrige selectores, timing, y assertions
- Verifica que el test pase después de la corrección

**Ejemplo de uso:**
```
/healer El test de login está fallando, arregla el selector
```

## Flujo de trabajo recomendado

1. **Planificar:** Usa `/planner` para crear un plan de pruebas completo
2. **Generar:** Usa `/generator` para convertir el plan en tests automatizados
3. **Reparar:** Si algún test falla, usa `/healer` para debuggearlo y arreglarlo

## Notas adicionales

- Los agentes están definidos en `.github/chatmodes/*.chatmode.md`
- Cada agente tiene herramientas específicas disponibles según su propósito
- Puedes combinar el uso de diferentes agentes según tus necesidades

