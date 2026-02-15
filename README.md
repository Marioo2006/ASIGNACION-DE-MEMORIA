# Tecnológico de Software
## Materia: Sistemas Operativos
## Alumnos: Jesús Omar Uc Domínguez - Venus Getsemani Semino Alemán - Roberto Balmes Solís - Mario Alberto De la Fuente Ruiz
## Docente: Jorge Javier Pedroza Romero
## Actividad: PUNTOS ADICIONALES: Simulador HTML Interactivo

---

# 🖥️ Simulador de Algoritmos de Asignación de Memoria

Simulador interactivo que compara los algoritmos **Best Fit** y **Worst Fit** para la asignación de memoria en sistemas operativos.

## 📋 Descripción

Este proyecto es una herramienta educativa que permite visualizar y comparar cómo funcionan dos algoritmos clásicos de asignación de memoria. Los usuarios pueden crear bloques de memoria, agregar procesos y observar en tiempo real cómo cada algoritmo gestiona la asignación de recursos.

## ✨ Características

- **Comparación en tiempo real** entre Best Fit y Worst Fit
- **Visualización interactiva** del estado de la memoria
- **Estadísticas de fragmentación** para cada algoritmo
- **Interfaz intuitiva** con diseño moderno y responsivo
- **Métricas de rendimiento** que muestran la eficiencia de cada algoritmo

## 🎯 Algoritmos Implementados

### Best Fit (Mejor Ajuste)
- Busca el bloque de memoria **más pequeño** que pueda contener el proceso
- **Ventaja:** Minimiza el espacio desperdiciado
- **Desventaja:** Puede generar muchos fragmentos pequeños

### Worst Fit (Peor Ajuste)
- Busca el bloque de memoria **más grande** disponible
- **Ventaja:** Deja fragmentos más grandes que pueden ser útiles después
- **Desventaja:** Puede desperdiciar espacio en bloques grandes

## 🚀 Cómo usar

### Paso a paso:

1. **Agregar bloques de memoria:**
   - Ingresa el tamaño del bloque en KB en el campo "Tamaño del bloque"
   - Haz clic en "Agregar Bloque"
   - El simulador inicia con 4 bloques predeterminados: 200 KB, 150 KB, 300 KB y 100 KB

2. **Crear procesos:**
   - Ingresa el tamaño del proceso en KB en el campo "Tamaño del proceso"
   - Haz clic en "Agregar Proceso"
   - El proceso se agregará a la lista de espera

3. **Asignar procesos:**
   - Haz clic en "Asignar Proceso" para que ambos algoritmos asignen el siguiente proceso en espera
   - Observa cómo cada algoritmo selecciona diferentes bloques de memoria

4. **Observar resultados:**
   - **Bloques verdes:** Memoria libre disponible
   - **Bloques morados:** Memoria asignada a un proceso
   - **Lista de procesos:** Muestra qué procesos están asignados (✓) o esperando (⏳)

5. **Analizar estadísticas:**
   - Revisa el porcentaje de fragmentación de cada algoritmo
   - Compara la cantidad de procesos asignados exitosamente
   - Observa las barras de memoria utilizada vs libre

6. **Reiniciar:**
   - **"Liberar Todo":** Desasigna todos los procesos pero mantiene los bloques de memoria
   - **"Reiniciar Memoria":** Elimina todo y vuelve a la configuración inicial

### ¿Qué significan los resultados?

- **Fragmentación baja:** El algoritmo está utilizando la memoria eficientemente
- **Fragmentación alta:** Hay muchos espacios pequeños inutilizables
- **Procesos asignados:** Indica qué algoritmo pudo asignar más procesos con la memoria disponible

## 📊 Métricas Disponibles

- **Fragmentación:** Porcentaje de memoria fragmentada en cada algoritmo
- **Procesos Asignados:** Cantidad de procesos que lograron asignarse
- **Memoria Utilizada:** Porcentaje de memoria en uso
- **Memoria Libre:** Porcentaje de memoria disponible

## 🎓 Explicación de los Algoritmos

### ¿Cómo funciona Best Fit?

1. El algoritmo recorre todos los bloques libres de memoria
2. Busca el bloque más pequeño que pueda contener el proceso
3. Asigna el proceso a ese bloque
4. **Objetivo:** Minimizar el espacio desperdiciado en cada asignación

**Ejemplo:** Si un proceso necesita 50 KB y hay bloques de 60 KB, 100 KB y 200 KB libres, Best Fit elegirá el bloque de 60 KB.

### ¿Cómo funciona Worst Fit?

1. El algoritmo recorre todos los bloques libres de memoria
2. Busca el bloque más grande disponible
3. Asigna el proceso a ese bloque
4. **Objetivo:** Dejar fragmentos más grandes que puedan ser útiles después

**Ejemplo:** Si un proceso necesita 50 KB y hay bloques de 60 KB, 100 KB y 200 KB libres, Worst Fit elegirá el bloque de 200 KB.

## 💭 Reflexión

La forma en que un sistema operativo administra la memoria es muy importante para que la computadora funcione bien. En este simulador podemos ver cómo dos algoritmos diferentes, Best Fit y Worst Fit, resuelven el mismo problema pero de maneras distintas.

Best Fit siempre busca el espacio más pequeño donde quepa un proceso. Esto suena como una buena idea porque no desperdicia mucho espacio. Funciona muy bien cuando todos los procesos son de tamaños parecidos. Pero tiene un problema: después de un tiempo, la memoria se llena de pedacitos muy pequeños que ya no sirven para nada. Es como cuando guardas cosas en cajas y te quedan muchos espacios chiquitos donde ya no cabe nada útil.

Worst Fit hace lo contrario: siempre elige el espacio más grande que encuentra. Al principio parece una mala idea, pero tiene su ventaja. Al usar los espacios grandes, lo que sobra sigue siendo un pedazo grande que después puede servir para otros procesos. Esto funciona bien cuando tienes procesos de muchos tamaños diferentes. El problema es que puede desperdiciar mucho espacio si no tienes mucha memoria disponible.

Entonces, ¿cuál es mejor? La verdad es que ninguno es perfecto para todas las situaciones. Depende de cómo uses tu computadora: qué programas corres, cuánta memoria tienes, y con qué frecuencia abres y cierras programas. 

Las computadoras reales usan métodos más avanzados que combinan lo mejor de estos algoritmos y otros más. También tienen trucos para reorganizar la memoria y aprovecharla mejor. Este simulador nos ayuda a entender cómo funciona la base de todo eso, para después poder comprender sistemas más complicados.


## 🛠️ Tecnologías

- **HTML5:** Estructura del simulador
- **CSS3:** Estilos, animaciones y diseño responsivo
- **JavaScript Vanilla:** Lógica de los algoritmos y gestión del estado

## 📁 Estructura del Proyecto
```
📦 ASIGNACION-DE-MEMORIA
 ┣ 📜 index.html       # Interfaz principal
 ┣ 📜 script.js        # Lógica de los algoritmos
 ┣ 📜 style.css        # Estilos y diseño
 └ 📜 README.md        # Documentación
```

## 📚 Referencias

- Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). *Operating System Concepts* (10th ed.). Wiley.
- Tanenbaum, A. S., & Bos, H. (2014). *Modern Operating Systems* (4th ed.). Pearson.
- Stallings, W. (2018). *Operating Systems: Internals and Design Principles* (9th ed.). Pearson.

## 🤖 Cláusula de Uso de IA

Nosotros, Jesús Omar Uc Domínguez - Mario Alberto De la Fuente - Roberto Balmes Solís - Venus Getsemani Semino Alemán, declaramos que NO hemos utilizado herramientas de Inteligencia Artificial para la elaboración de este trabajo académico. Afirmamos que contamos con evidencias físicas y/o digitales que demuestran nuestra autoría, incluyendo pero no limitándose a: documentos manuscritos, materiales impresos con anotaciones o subrayado, historial de versiones de documentos electrónicos, o commits en repositorios de código.

Reconocemos y aceptamos que el profesor se reserva el derecho de solicitar dichas evidencias en cualquier momento, especialmente cuando existan sospechas o se detecten conductas que atenten contra la integridad académica, tales como plagio o uso no reportado de herramientas de IA.
