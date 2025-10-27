# Guía Práctica: Git desde tu IDE

## 📋 Requisitos Previos

- **Git** instalado en tu sistema
- **IDE** (VS Code, IntelliJ, WebStorm, etc.)
- **Cuenta en GitHub/GitLab/Bitbucket**

## 🚀 Configuración Inicial

### 1. Configurar Git (primera vez)
```bash
# Configurar tu identidad
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Verificar configuración
git config --list
```

### 2. Configurar SSH (recomendado)
```bash
# Generar clave SSH
ssh-keygen -t rsa -b 4096 -C "tu.email@ejemplo.com"

# Agregar clave al ssh-agent
ssh-add ~/.ssh/id_rsa

# Copiar clave pública (para agregar a GitHub/GitLab)
cat ~/.ssh/id_rsa.pub
```

## 📁 Crear Repositorio desde IDE

### Opción 1: Crear Repositorio Local
```bash
# En tu IDE terminal
mkdir mi-proyecto
cd mi-proyecto

# Inicializar repositorio Git
git init

# Crear archivo README
echo "# Mi Proyecto" > README.md

# Agregar archivos al staging
git add .

# Primer commit
git commit -m "Initial commit"
```

### Opción 2: Clonar Repositorio Existente
```bash
# Clonar desde GitHub/GitLab
git clone https://github.com/usuario/repositorio.git
cd repositorio
```

## 🔧 Comandos Esenciales de Git

### Estados de Archivos
```bash
# Ver estado de archivos
git status

# Ver diferencias
git diff

# Ver diferencias en staging
git diff --staged
```

### Agregar y Commitear
```bash
# Agregar archivo específico
git add archivo.txt

# Agregar todos los archivos
git add .

# Agregar archivos modificados
git add -u

# Commit con mensaje
git commit -m "Descripción del cambio"

# Commit rápido (solo archivos ya tracked)
git commit -am "Mensaje"
```

### Historial y Logs
```bash
# Ver historial de commits
git log

# Ver historial compacto
git log --oneline

# Ver historial con gráfico
git log --graph --oneline --all

# Ver cambios en un commit específico
git show <hash-del-commit>
```

## 🌿 Manejo de Ramas

### Crear y Cambiar Ramas
```bash
# Ver ramas existentes
git branch

# Crear nueva rama
git branch nueva-rama

# Cambiar a rama
git checkout nueva-rama

# Crear y cambiar en un comando
git checkout -b nueva-rama

# Cambiar a rama principal (Git 2.23+)
git switch main
git switch -c nueva-rama
```

### Fusionar Ramas
```bash
# Cambiar a rama destino
git checkout main

# Fusionar rama
git merge nueva-rama

# Fusionar sin commit automático
git merge --no-commit nueva-rama
```

### Eliminar Ramas
```bash
# Eliminar rama local
git branch -d nombre-rama

# Forzar eliminación
git branch -D nombre-rama

# Eliminar rama remota
git push origin --delete nombre-rama
```

## 🔄 Trabajar con Repositorios Remotos

### Configurar Remote
```bash
# Ver remotes configurados
git remote -v

# Agregar remote
git remote add origin https://github.com/usuario/repo.git

# Cambiar URL del remote
git remote set-url origin nueva-url
```

### Push y Pull
```bash
# Subir cambios al repositorio remoto
git push origin main

# Subir nueva rama
git push -u origin nueva-rama

# Descargar cambios del remoto
git pull origin main

# Solo descargar sin fusionar
git fetch origin
```

## 🔄 Flujo de Trabajo Típico

### Flujo Básico Diario
```bash
# 1. Actualizar repositorio local
git pull origin main

# 2. Crear rama para nueva funcionalidad
git checkout -b feature/nueva-funcionalidad

# 3. Hacer cambios y commits
git add .
git commit -m "Agregar nueva funcionalidad"

# 4. Subir rama
git push -u origin feature/nueva-funcionalidad

# 5. Crear Pull Request desde GitHub/GitLab
```

### Flujo con Rebase
```bash
# Actualizar rama principal
git checkout main
git pull origin main

# Cambiar a tu rama
git checkout feature/mi-rama

# Rebase sobre main actualizado
git rebase main

# Resolver conflictos si los hay
git add archivo-resuelto.txt
git rebase --continue

# Subir cambios (force push)
git push --force-with-lease origin feature/mi-rama
```

## 🛠️ Comandos de Mantenimiento

### Limpiar Repositorio
```bash
# Eliminar archivos no tracked
git clean -f

# Eliminar archivos y directorios no tracked
git clean -fd

# Ver qué se eliminaría (dry run)
git clean -n
```

### Deshacer Cambios
```bash
# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1

# Deshacer cambios en archivo específico
git checkout -- archivo.txt

# Deshacer cambios en staging
git reset HEAD archivo.txt
```

### Stash (Guardar Cambios Temporalmente)
```bash
# Guardar cambios temporalmente
git stash

# Guardar con mensaje
git stash save "Mensaje descriptivo"

# Ver stashes guardados
git stash list

# Aplicar último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{0}

# Eliminar stash
git stash drop stash@{0}
```

## 🔧 Configuración Avanzada

### Alias Útiles
```bash
# Crear alias para comandos largos
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### Ignorar Archivos (.gitignore)
```bash
# Crear archivo .gitignore
touch .gitignore

# Ejemplos de contenido para .gitignore:
echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
```

## 🎯 Comandos de Ayuda Memoria

### Los Más Usados
```bash
# Comandos diarios
git status                 # Ver estado
git add .                  # Agregar todos los archivos
git commit -m "mensaje"    # Commit con mensaje
git push origin main       # Subir cambios
git pull origin main       # Descargar cambios

# Ramas
git checkout -b nueva-rama # Crear y cambiar rama
git branch                 # Ver ramas
git merge rama             # Fusionar rama

# Historial
git log --oneline          # Ver commits
git show <hash>            # Ver cambios de commit

# Deshacer
git reset --soft HEAD~1    # Deshacer último commit
git checkout -- archivo    # Deshacer cambios archivo
```

## 🐛 Solución de Problemas Comunes

### Error: "Your branch is ahead of origin"
```bash
# Subir cambios pendientes
git push origin main
```

### Error: "Merge conflict"
```bash
# Resolver conflictos manualmente en el IDE
# Luego:
git add archivo-resuelto.txt
git commit -m "Resolve merge conflict"
```

### Error: "Permission denied"
```bash
# Verificar configuración SSH
ssh -T git@github.com

# O usar HTTPS en lugar de SSH
git remote set-url origin https://github.com/usuario/repo.git
```

### Error: "Branch already exists"
```bash
# Cambiar a la rama existente
git checkout nombre-rama

# O eliminar y recrear
git branch -D nombre-rama
git checkout -b nombre-rama
```

## 📚 Recursos Adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [GitLab Docs](https://docs.gitlab.com/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

## 🎯 Integración con IDE

### VS Code
- **Ctrl+Shift+G**: Abrir panel de Git
- **Ctrl+K Ctrl+O**: Abrir repositorio
- **Ctrl+Shift+P**: Comando "Git: Clone"

### IntelliJ/WebStorm
- **Ctrl+Alt+Z**: Git operations
- **Ctrl+K**: Commit
- **Ctrl+Shift+K**: Push

---

**💡 Tip**: Usa `git status` frecuentemente para mantenerte al tanto del estado de tu repositorio.
