# DESIGN.md · Plataforma Digital de Gestión de Predios

Dirección de diseño del sistema. `antislop` es el filtro; este archivo es la fuente.

## Identidad

- Producto: sistema de gestión interna (ERP de expedientes prediales) para funcionarios de la DGPPT del MTC.
- Audiencia: especialistas técnicos y legales, brigadistas, tesorería, custodia, supervisores. Usan el sistema varias horas al día, con formularios largos y tablas densas.
- Lenguaje visual: institucional gob.pe. Rojo, blanco, gris. Referencias de composición: Mesa de Partes Virtual del MTC (etiqueta a la izquierda, control a la derecha, ícono de prefijo) y un panel de operación tipo ERP (barra superior roja, sidebar blanco, tarjetas sobre fondo gris).
- Personalidad: sobria, precisa, previsible. Lo que se aprende en una pantalla sirve en las otras 95.

Dial: ENERGÍA 1 / RITMO 1 / MOVIMIENTO 1

Razones (una línea cada una):

- Energía 1: herramienta de trabajo diario; la calma reduce errores en formularios largos.
- Ritmo 1: la uniformidad es la petición del usuario y lo que hace predecible el sistema.
- Movimiento 1: solo hover y foco; nada se mueve sin una acción del usuario.
- Foco por pantalla: la tarjeta de título. Todo lo demás se subordina a ella.
- Acento único: ámbar, reservado al semáforo de plazos legales y al badge "Nuevo".
- Motivo de identidad: la franja roja superior de 56 px y la regla roja de 2 px bajo cada subtítulo de sección (la misma que usa gob.pe).

## Paleta (2 colores base + 1 acento; los neutros no cuentan)

| Token                | Valor   | Uso                                                                                               | Razón                                                                             |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `--primary`          | #C8102E | barra superior, banda de rol, botón primario, pestaña activa, foco                                | rojo institucional gob.pe                                                         |
| `--primary-dark`     | #8B1A1A | hover del primario, subtítulos de sección, ícono de prefijo en inputs, texto de cabecera de tabla | el tono que usa la Mesa de Partes para íconos y toggles                           |
| `--primary-soft`     | #F8E1E1 | cabecera de tabla, caja del ícono de prefijo, fila activa del sidebar                             | fondo del mismo rojo, legible con `--primary-dark` encima (7,1:1)                 |
| `--highlight`        | #F2A900 | semáforo "por vencer", badge "Nuevo"                                                              | único acento; se llama `highlight` porque shadcn reserva `--accent` para el hover |
| `--background`       | #F3F4F6 | fondo de contenido                                                                                | gris de gob.pe; se descarta el lila de la referencia                              |
| `--card`             | #FFFFFF | tarjetas, formularios, tablas, sidebar                                                            |                                                                                   |
| `--border`           | #D1D5DB | bordes de tarjeta e input                                                                         | más oscuro que el gris-200 actual para que los inputs se vean sin foco            |
| `--foreground`       | #1F2937 | texto                                                                                             | 14,7:1 sobre blanco                                                               |
| `--muted-foreground` | #4B5563 | texto secundario, ayuda                                                                           | 7,5:1 sobre blanco (el #6B7280 actual da 4,8:1, justo)                            |
| `--success`          | #15803D | estado completado, dentro de plazo                                                                | 4,9:1 sobre blanco                                                                |
| `--warning`          | #B45309 | texto de advertencia (el ámbar #F2A900 solo como fondo)                                           | 4,6:1 sobre blanco                                                                |
| `--destructive`      | #B91C1C | error, anular, plazo vencido                                                                      | 6,1:1 sobre blanco                                                                |

Contraste verificado: blanco sobre #C8102E = 5,9:1; blanco sobre #8B1A1A = 9,4:1.

Prohibido escribir un hex en una página. Solo clases de token: `bg-primary`, `text-primary-dark`, `bg-primary-soft`, `text-muted-foreground`, `border-border`.

## Tipografía

Fuente: Inter, pesos 400 / 500 / 600 / 700. Razón: la usan los portales digitales recientes del MTC y rinde bien a 13 px en tablas densas. Cifras tabulares (`tabular-nums`) en montos y fechas.

Escala única (clases de Tailwind; se eliminan todos los `text-[Npx]`):

| Clase       | Tamaño                                         | Rol                                                                                                                      |
| ----------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `text-2xl`  | 20 px · 700 · mayúsculas · `text-primary-dark` | título de página                                                                                                         |
| `text-xl`   | 18 px · 600                                    | título de diálogo                                                                                                        |
| `text-lg`   | 16 px · 600                                    | cifra destacada en tarjeta de resumen                                                                                    |
| `text-base` | 14 px · 400                                    | cuerpo, inputs, selects, botones                                                                                         |
| `text-sm`   | 13 px                                          | etiquetas de formulario (500), celdas de tabla (400), subtítulo de sección (700, mayúsculas, regla roja)                 |
| `text-xs`   | 12 px                                          | cabecera de tabla (600, mayúsculas, sin tracking amplio), ayuda y metadatos (400, `text-muted-foreground`), badges (600) |

Mínimo absoluto: 12 px. Mayúsculas solo en título de página, subtítulo de sección y cabecera de tabla; nunca con `tracking-wide`.

## Medidas

| Elemento             | Medida                                                                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Barra superior       | 56 px                                                                                                                                                                                                                                        |
| Sidebar              | 240 px; colapsado 56 px (solo íconos, con tooltip)                                                                                                                                                                                           |
| Input, select, botón | 36 px de alto; botón de ícono en tabla 32 × 32 (44 × 44 en táctil)                                                                                                                                                                           |
| Fila de tabla        | 40 px; cabecera 36 px                                                                                                                                                                                                                        |
| Radio                | `rounded-md` = 4 px en controles y botones; `rounded-sm` = 2 px en badges; `rounded-lg` = 6 px en tarjetas y diálogos (`--radius: 0.375rem`). Sin píldoras                                                                                   |
| Espaciado            | escala de 4: 4 / 8 / 12 / 16 / 24 / 32. Padding de tarjeta 16. Gap entre tarjetas 16. Gap entre campos 12                                                                                                                                    |
| Grilla de formulario | 12 columnas. Etiqueta 3 + control 9. Dos mitades simétricas desde 1024 px; una columna por debajo, etiqueta encima del control                                                                                                               |
| Sombra               | ninguna en tarjetas (borde 1 px `--border`). Solo en diálogos y menús flotantes, como marca de elevación                                                                                                                                     |
| Íconos               | Lucide, trazo 2. 16 px en controles y tabla, 20 px en sidebar, 44 px en tarjetas del portal. Razón: es el único set instalado; cada ícono se elige por el verbo o el objeto que representa. Nunca sparkle, estrella, rayo, diamante ni robot |
| Foco                 | anillo 2 px `--primary`, desplazado 2 px, en todo control                                                                                                                                                                                    |

## Componentes y patrones

- Tarjeta de título: ícono + nombre en `text-2xl`, acciones a la derecha. Única por pantalla.
- Subtítulo de sección: `text-sm` 700 mayúsculas `text-primary-dark`, regla inferior de 2 px `--primary`, margen inferior 12.
- Formulario: etiqueta izquierda, control derecha, asterisco rojo en obligatorios, ícono de prefijo en caja `--primary-soft` solo cuando aclara el tipo de dato (fecha, moneda, documento).
- Tabla CRUD: cabecera `--primary-soft`, filas zebra con `--background`, columna de acciones a la derecha con íconos y tooltip obligatorio, paginación "Mostrando a–b de N".
- Estados: vacío, cargando (`Skeleton` con el mismo número de filas), error con "Reintentar". Obligatorios en toda lista y detalle.
- Badge de estado: fondo suave + texto oscuro del mismo color (`success`, `warning`, `destructive`, `primary-soft`).
- Semáforo de plazo: verde dentro de plazo, ámbar a 3 días hábiles o menos, rojo vencido. Siempre con el texto "vence el dd/mm" al lado; el color nunca es la única señal.
- Diálogo: encabezado con título `text-xl`, cuerpo blanco, botones al pie a la derecha. Cierra con Esc y devuelve el foco.
- Formulario del predio, de arriba abajo (detalle y reglas R1–R10 en `docs/PLAN-INTERFACES.md`):
  1. Cabecera del predio y del paso.
  2. «Documentos que genera este paso»: franja plegada, muy sutil (título, "n de m generados", Mostrar). Abierta: si se generó, su código y el último.
  3. Etapa, plegada.
  4. Información del predio, plegada.
  5. Secciones de datos: máximo dos columnas; textarea, archivo, foto, lista y tabla a ancho completo y al final de su sección.
  6. «Documentos recibidos» (lo que se sube), última sección del formulario.
  7. Barra de botones `FormActions`.
- Envíos y notificaciones (correo, SMS, SUNARP, SBN, notaría, tasador): el botón va en su panel y debajo la tabla `HistorialEnvios` con cada envío (fecha, canal, destinatario, documento, realizado por, resultado). Resultados: enviado, aceptado, observado, rechazado, finalizado.
- Barra de botones al pie, a la derecha, en este orden:
  1. Cancelar o Volver.
  2. Acciones secundarias (Guardar borrador, Exportar).
  3. Transiciones (Derivar, Observar; en rojo si anulan).
  4. El único botón primario, Registrar o Guardar, siempre al final.
- Ubicación de los demás botones:
  - Los que agregan una fila (Añadir titular, Registrar envío) van en la cabecera de su sección o junto a la tabla que llenan, no en la barra.
  - Las acciones por fila van en la última columna, en este orden: Ver, Editar, Descargar y, al final, Anular.
- Estado del paso en el menú del predio:
  - Validado: ícono BadgeCheck, verde `success`.
  - Incompleto: ícono CircleAlert, ámbar `warning`.
  - Sin registrar: ícono CircleDashed, gris.
  - No aplica aún: candado.
  - El texto toma el mismo color que el ícono. El paso abierto se marca con un borde rojo sobre fondo blanco, no con fondo de color, para que el color del estado se lea.

## Textos

- Verbos reales en botones: "Guardar predio", "Generar carta", "Anular expediente". Nunca "Aceptar", "OK", "Enviar".
- Mensajes con sujeto: "Predio guardado", "No se pudo generar la carta: falta la tasación". Nunca "se guardó exitosamente".
- Sin raya larga (—). Separadores: coma, punto, dos puntos, paréntesis o el punto medio (·) en metadatos.
- Sin "exitosamente", "de manera eficiente", "robusto", "potente". Sin mayúsculas para enfatizar dentro de un párrafo.
- Datos de demostración siempre etiquetados "Datos de demostración" mientras no exista backend.

## Fuera de la dirección

Modo oscuro: no hay razón de marca ni de usuario en una herramienta de oficina. La estructura de tokens queda lista por si se pide.
