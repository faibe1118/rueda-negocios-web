# Crear Usuario Moderador

Este script crea un usuario moderador de prueba en la base de datos para poder acceder al panel de moderador.

## Credenciales del Usuario Moderador

Después de ejecutar el script, podrás usar estas credenciales:

- **Email:** `moderador@workside.com`
- **Password:** `moderador123`
- **Rol:** `adminSistema`
- **Estado:** `aprobado`

## Cómo ejecutar el script

### Opción 1: Usando npm
```bash
cd backend
npm run create-moderator
```

### Opción 2: Ejecutar directamente
```bash
cd backend
node scripts/createModerator.js
```

## Pasos para ver el panel de moderador

1. Ejecuta el script para crear el usuario moderador
2. Inicia el servidor: `npm run dev` o `npm start`
3. Ve a: `http://localhost:4000/login`
4. Inicia sesión con las credenciales del moderador
5. Guarda el token JWT que recibes en la respuesta del login
6. Abre las herramientas de desarrollador (F12) y en la consola ejecuta:
   ```javascript
   localStorage.setItem('token', 'TU_TOKEN_AQUI');
   ```
7. Navega a: `http://localhost:4000/moderator`

## Nota

El script eliminará y recreará el usuario si ya existe uno con el mismo email, así que puedes ejecutarlo múltiples veces sin problemas.

