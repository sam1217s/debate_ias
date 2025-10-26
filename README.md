# 🎤 Debate IA - Edición Genética

Aplicación web interactiva que simula un debate entre dos expertos sobre edición genética con CRISPR, utilizando inteligencia artificial para generar respuestas argumentativas.

## 🚀 Características

- **Debate dinámico**: Interfaz estilo WhatsApp con burbujas de chat
- **IA avanzada**: Utiliza GPT-4o-mini de OpenAI para respuestas inteligentes
- **Expertos realistas**: Dos perspectivas opuestas defendidas por perfiles especializados
- **Exportación**: Genera PDFs con el debate completo
- **Interfaz moderna**: Diseño inspirado en WhatsApp con animaciones suaves
- **Responsive**: Adaptado para dispositivos móviles y desktop

## 👥 Expertos

### 🧬 George Church
Genetista visionario que defiende la edición genética CRISPR y sus beneficios para curar enfermedades, mejorar la seguridad alimentaria y conservar especies.

### 📚 Francis Fukuyama
Filósofo crítico que cuestiona la edición genética por sus riesgos éticos, sociales y filosóficos, incluyendo inequidad y pérdida de diversidad humana.

## 🛠️ Tecnologías

- **Backend**: Node.js + Express
- **Base de datos**: MongoDB
- **IA**: OpenAI GPT-4o-mini
- **Frontend**: HTML5, CSS3, JavaScript
- **PDF**: PDFKit para exportación

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/sam1217s/debate_ias.git
cd debate_ias
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno. Crea un archivo `.env`:
```env
PORT=3000
OPENAI_API_KEY=tu_api_key_aqui
MONGODB_URI=tu_mongodb_uri_aqui
```

4. Inicia el servidor:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🚀 Despliegue en Render

Para desplegar en Render:

1. Haz push de tu código a GitHub
2. Conecta tu repositorio a Render
3. Configura las variables de entorno en Render:
   - `OPENAI_API_KEY`
   - `MONGODB_URI`
   - `PORT` (Render lo maneja automáticamente)
4. Render automáticamente detectará el proyecto Node.js y lo desplegará

## 📝 Scripts Disponibles

- `npm start`: Inicia el servidor de producción
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon

## 🎯 Uso

1. Haz clic en "Iniciar Debate" en el modal de bienvenida
2. Selecciona un experto para comenzar el debate
3. Alterna entre los dos expertos para generar respuestas
4. Usa "Limpiar debate" para reiniciar
5. Exporta el debate a PDF para guardarlo
6. Usa "Terminar debate" para finalizar y volver al inicio

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para promover la discusión educativa sobre temas científicos controvertidos.
