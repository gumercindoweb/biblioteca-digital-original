# Biblioteca Digital — Dirección de Diseño

## Tres enfoques estilísticos

### 1. Archivo Nocturno
Inspirado en las salas de lectura de noche: fondos casi negros con cálidos destellos ámbar, tipografía serif elegante, texturas de papel envejecido. Sensación de intimidad intelectual.
**Probabilidad:** 0.07

### 2. Manuscrito Moderno
Estética de cuaderno de notas de diseñador: fondo crema, tinta oscura, líneas editoriales, mezcla de tipografía serif y monoespaciada. Como un diario de aprendizaje bien diseñado.
**Probabilidad:** 0.04

### 3. Cuarto de Control Intelectual
Interfaz oscura tipo "command center" para una mente curiosa: negro profundo, acentos en ámbar dorado y terracota, tipografía condensada y expresiva. Sensación de poder y claridad mental.
**Probabilidad:** 0.02

---

## Enfoque Elegido: **Archivo Nocturno**

### Design Movement
Editorial de lujo nocturno — inspirado en las grandes bibliotecas privadas del siglo XIX fusionadas con el diseño editorial de revistas culturales contemporáneas.

### Core Principles
1. **Calidez intelectual**: El conocimiento tiene temperatura. Todo el sistema de color emana calor ámbar sobre oscuridad profunda.
2. **Jerarquía tipográfica radical**: Los títulos mandan. Serif expresivo para encabezados, sans-serif refinado para cuerpo.
3. **Densidad controlada**: Las tarjetas de recursos son densas en información pero respiran gracias al espaciado generoso entre grupos.
4. **Navegación lateral persistente**: La biblioteca siempre visible a la izquierda, como los estantes de una sala de lectura.

### Color Philosophy
- **Fondo base**: `#0D0B08` — negro cálido, no frío. Evoca cuero y madera oscura.
- **Superficie de tarjeta**: `#161310` — ligeramente más claro, con textura sutil.
- **Acento primario**: `#C8922A` — ámbar dorado. El color de la luz de vela sobre páginas amarillas.
- **Acento secundario**: `#8B4513` — terracota oscura. Para categorías y estados.
- **Texto primario**: `#F0E6D3` — crema cálida. Nunca blanco puro.
- **Texto secundario**: `#8A7D6B` — arena oscura. Para metadatos y subtítulos.

### Layout Paradigm
Sidebar fijo a la izquierda (220px) con categorías y tipos de recurso. Área principal con grid asimétrico: header editorial con nombre de categoría en grande, luego grid de tarjetas 3-2-1 según viewport. Sin layout centrado genérico.

### Signature Elements
1. **Línea dorada**: Una línea horizontal de 1px en ámbar que separa el header del contenido — aparece en tarjetas, secciones y sidebar.
2. **Numeración de estante**: Cada categoría tiene un número romano discreto (I, II, III...) en tipografía monoespaciada.
3. **Etiquetas de estado**: Pequeñas pastillas con bordes ámbar para "Leyendo", "En cola", "Completado".

### Interaction Philosophy
Hover suave con elevación de tarjeta (translateY -2px) y aparición de borde ámbar. Filtros que se activan con transición de color, no de posición. Búsqueda que filtra con fade, no con salto.

### Animation
- Entrada de página: stagger de tarjetas con delay de 40ms por ítem, fade + translateY(8px) → 0
- Hover de tarjeta: 180ms ease-out, sombra ámbar difusa
- Cambio de categoría: fade de 200ms del área de contenido
- Sidebar: sin animación — es permanente y estable

### Typography System
- **Display / Títulos grandes**: `Playfair Display` — serif expresivo con contraste alto entre trazos
- **UI / Cuerpo**: `DM Sans` — sans-serif limpio y moderno, legible en tamaños pequeños
- **Metadatos / Números**: `JetBrains Mono` — monoespaciado para números de estante, fechas, contadores

### Brand Essence
**"Tu mente, organizada."** — Para el aprendiz voraz que necesita claridad sobre su propio conocimiento. Diferente porque no es una app de notas ni un gestor de tareas: es una biblioteca viva.
Personalidad: **Sereno · Intelectual · Personal**

### Brand Voice
Titular: *"Todo lo que aprendes, en un solo lugar."*
CTA: *"Explorar mi biblioteca"*
Microcopy: *"Agregado a tu estante"* (no "Guardado exitosamente")

### Wordmark & Logo
Un símbolo de llama estilizada dentro de un rectángulo vertical (como el lomo de un libro). La llama representa el conocimiento encendido. Sin texto en el logo.

### Signature Brand Color
`#C8922A` — Ámbar biblioteca. El color de la luz que ilumina las páginas en la oscuridad.
