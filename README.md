# Eva Cristina Manotas Rodríguez · Decanatura 2026–2028

Página de la candidatura a la Decanatura de la Facultad de Minas,
Universidad Nacional de Colombia — Sede Medellín. **Plancha #4**.

- Sitio estático, sin dependencias ni proceso de build.
- `index.html` contiene la estructura y el contenido semántico.
- `styles.css` define el sistema visual y los breakpoints responsive.
- `script.js` añade revelados progresivos y estado de navegación.
- `assets/` contiene versiones web optimizadas del retrato, las acuarelas y el favicon.
- Identidad vinculada al [tablero público del Plan de Acción](https://tablero-plan-de-accion.vercel.app).
- Consulta: jueves 17 de septiembre de 2026 · plataforma Participa UNAL.

## Desarrollo local

```bash
python -m http.server 5174
```

y abrir `http://localhost:5174`.

## Pruebas

```bash
node --test tests/site.test.mjs
```
