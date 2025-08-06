# 🚀 Guía de Inicio Rápido - IA Performance Web

## ⚡ Empezar en 30 segundos

### 1. Abrir la Página Web
Simplemente abre el archivo `index.html` con cualquier navegador moderno:
- **Doble click** en `index.html`
- O **arrastra** el archivo al navegador
- O **click derecho** → "Abrir con" → tu navegador favorito

### 2. Servidor de Desarrollo (Recomendado)

#### Windows
```cmd
# Usar el script incluido
dev.bat serve

# O manualmente con Python
python -m http.server 8080

# O con Node.js
npx serve . -p 3000
```

#### Linux/Mac
```bash
# Usar el script incluido
chmod +x dev.sh
./dev.sh serve

# O manualmente con Python
python3 -m http.server 8080

# O con Node.js
npx serve . -p 3000
```

### 3. Ver el Resultado
- Abre tu navegador en: `http://localhost:8080` (o el puerto que uses)
- ¡Listo! Tu página web está funcionando

---

## 🌐 Desplegar en Internet

### Opción 1: Netlify (Recomendado - Gratis)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra toda la carpeta del proyecto
3. ¡Tu sitio estará online en minutos!

### Opción 2: Vercel (Gratis)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio GitHub
3. Deploy automático

### Opción 3: GitHub Pages (Gratis)
1. Sube el proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main
4. ¡Listo!

---

## 📁 Estructura del Proyecto

```
ia-performance-web/
├── 📄 index.html           # Página principal
├── 🎨 styles.css          # Estilos CSS
├── ⚡ script.js           # Funcionalidades JavaScript
├── 📦 package.json        # Metadatos del proyecto
├── 📱 manifest.json       # Configuración PWA
├── 🤖 robots.txt          # SEO - Robots
├── 🗺️ sitemap.xml         # SEO - Sitemap
├── 🚀 netlify.toml        # Config Netlify
├── ☁️ vercel.json         # Config Vercel
├── 📚 README.md           # Documentación completa
├── ⚖️ LICENSE.md          # Licencia
├── 🔧 dev.sh / dev.bat    # Scripts de desarrollo
├── 🚫 .gitignore          # Git ignore
└── 📸 images/             # Imágenes
    ├── image1.png         # Gráfico 1
    └── image2.png         # Gráfico 2
```

---

## 🛠️ Comandos Útiles

### Scripts de Desarrollo

#### Windows
- `dev.bat serve` - Servidor de desarrollo
- `dev.bat test` - Validar proyecto
- `dev.bat deploy` - Preparar para producción
- `dev.bat info` - Ver información del proyecto

#### Linux/Mac
- `./dev.sh serve` - Servidor de desarrollo
- `./dev.sh test` - Validar proyecto
- `./dev.sh deploy` - Preparar para producción
- `./dev.sh info` - Ver información del proyecto

---

## ✨ Características Principales

### 🎨 Diseño
- ✅ Totalmente responsivo (móvil, tablet, desktop)
- ✅ Diseño moderno con gradientes y animaciones
- ✅ Tema de colores profesional
- ✅ Iconos Font Awesome
- ✅ Fuente Google Fonts (Inter)

### 🚀 Rendimiento
- ✅ Carga rápida (sin dependencias pesadas)
- ✅ Optimizado para móviles
- ✅ Imágenes optimizadas
- ✅ CSS y JS minificables

### 📱 PWA (Progressive Web App)
- ✅ Installable en móviles y desktop
- ✅ Funciona offline (básico)
- ✅ Iconos de aplicación
- ✅ Splash screen personalizado

### 🔍 SEO Optimizado
- ✅ Meta tags completos
- ✅ Open Graph (redes sociales)
- ✅ Twitter Cards
- ✅ Sitemap XML
- ✅ Robots.txt
- ✅ Structured data ready

### ⚡ Funcionalidades
- ✅ Navegación suave entre secciones
- ✅ Animaciones de scroll
- ✅ Menú hamburguesa móvil
- ✅ Efectos hover interactivos
- ✅ Analytics ready

---

## 🎯 Casos de Uso

### Para Desarrolladores
- Base para proyectos de análisis técnico
- Template para landing pages
- Ejemplo de PWA básica
- Referencia de SEO moderno

### Para Investigadores IA
- Presentar comparaciones de modelos
- Mostrar métricas de rendimiento
- Crear reportes visuales interactivos

### Para Empresas
- Landing page de producto IA
- Presentaciones comerciales
- Documentación técnica
- Marketing de soluciones IA

---

## 🆘 Problemas Comunes

### "No se abre la página"
- ✅ Verifica que tengas un navegador moderno
- ✅ Usa servidor local en lugar de abrir archivo directo
- ✅ Revisa que todas las imágenes estén en la carpeta `images/`

### "Los estilos no se cargan"
- ✅ Asegúrate de usar servidor HTTP
- ✅ Verifica que `styles.css` esté en la raíz del proyecto
- ✅ Comprueba la consola del navegador (F12)

### "Las imágenes no aparecen"
- ✅ Confirma que `image1.png` e `image2.png` están en `/images/`
- ✅ Verifica los nombres exactos de los archivos
- ✅ Usa servidor HTTP para evitar problemas de CORS

---

## 💡 Personalización Rápida

### Cambiar Colores
Edita las variables en `styles.css`:
```css
:root {
    --primary-color: #TU_COLOR_AQUI;
    --secondary-color: #TU_COLOR_AQUI;
}
```

### Cambiar Textos
Edita directamente en `index.html` - todo está claramente etiquetado.

### Agregar Secciones
Copia el patrón de cualquier sección existente en el HTML y personaliza.

---

## 🔗 Links Útiles

- **Documentación Completa**: Ver `README.md`
- **Licencia**: Ver `LICENSE.md`
- **Netlify**: https://netlify.com
- **Vercel**: https://vercel.com
- **Font Awesome**: https://fontawesome.com
- **Google Fonts**: https://fonts.google.com

---

## 🤝 Soporte

¿Necesitas ayuda? 
- 📚 Revisa el `README.md` completo
- 🐛 Usa la consola del navegador (F12) para debuggear
- 🔧 Ejecuta `dev.bat test` o `./dev.sh test` para validar
- 💬 El código está bien comentado para facilitar modificaciones

---

**¡Disfruta tu nueva página web de análisis de IA! 🎉**

*Creado con ❤️ para la comunidad de desarrolladores y entusiastas de la IA*