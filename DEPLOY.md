# 🚀 Guía de Despliegue en Render

## Paso 1: Obtener tus Credenciales

### OpenAI API Key
1. Ve a [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Inicia sesión en tu cuenta
3. Haz clic en "Create new secret key"
4. Copia la clave (formato: `sk-proj-...`)
5. Guarda esta clave, no la volverás a ver

### MongoDB Connection String
1. Ve a [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Inicia sesión
3. Crea un cluster gratuito (M0)
4. Ve a "Database Access" → crea un usuario
5. Ve a "Network Access" → agrega IP: 0.0.0.0/0 (allow from anywhere)
6. Ve a "Connect" → "Connect your application"
7. Copia la connection string (formato: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
8. Reemplaza `<password>` con tu contraseña real

## Paso 2: Conectar con Render

1. Ve a [render.com](https://render.com) e inicia sesión
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio GitHub: `sam1217s/debate_ias`
4. Autoriza el acceso si es necesario

## Paso 3: Configurar el Servicio

Render detectará automáticamente el archivo `render.yaml` y usará estas configuraciones:

### Configuraciones Automáticas (desde render.yaml):
- **Name**: debate-ias
- **Environment**: Node
- **Build Command**: npm install
- **Start Command**: npm start
- **Health Check Path**: /

**No necesitas configurar nada manualmente si usas el render.yaml**

## Paso 4: Agregar Variables de Entorno

En la sección "Environment Variables", agrega:

### Variable 1:
```
Key: OPENAI_API_KEY
Value: (pega tu API key de OpenAI)
```

### Variable 2:
```
Key: MONGODB_URI
Value: (pega tu connection string de MongoDB)
```

### Variable 3 (opcional):
```
Key: NODE_ENV
Value: production
```

## Paso 5: Desplegar

1. Selecciona el plan **Free** (tiene 750 horas/mes gratis)
2. Haz clic en "Create Web Service"
3. Render comenzará a construir y desplegar tu aplicación
4. Espera 3-5 minutos para el primer despliegue
5. Verás la URL de tu aplicación (formato: `debate-ias.onrender.com`)

## Paso 6: Verificar el Despliegue

1. Ve a la URL de tu aplicación
2. Deberías ver el modal de bienvenida
3. Inicia un debate para verificar que OpenAI funciona
4. Verifica los logs en Render si hay problemas

## 📋 Checklist Final

- [ ] Cuenta de Render creada
- [ ] Repositorio conectado
- [ ] OPENAI_API_KEY configurada
- [ ] MONGODB_URI configurada
- [ ] Servicio desplegado
- [ ] URL funcional verificada
- [ ] Debate probado exitosamente

## 🔧 Solución de Problemas

### Error: "Cannot find module"
- Verifica que `package.json` esté en la raíz del repositorio
- Asegúrate que todas las dependencias estén listadas

### Error: "Connection refused" (MongoDB)
- Verifica que `MONGODB_URI` esté correctamente configurada
- Asegúrate que el IP 0.0.0.0/0 esté permitido en MongoDB Atlas

### Error: "OpenAI API error"
- Verifica que `OPENAI_API_KEY` sea válida
- Chequea que tengas créditos en tu cuenta de OpenAI

### El servidor no inicia
- Revisa los logs en Render (botón "Logs")
- Verifica que el puerto no esté hardcodeado (Render maneja el PORT)

## 💡 Tips

- Render hace auto-deploy cada vez que haces push a main
- El tier gratuito entra en "sleep mode" después de 15 min de inactividad
- La primera visita después del sleep puede tomar 30-50 segundos
- Considera el tier Starter ($7/mes) para evitar el sleep mode

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render
2. Verifica las variables de entorno
3. Consulta la documentación de [Render](https://render.com/docs)
