Prueba Técnica Velora

1. Descripción
   Aplicación web sobre un listado de pokemon elegibles para formar equipos y poder combatir un equipo contra otro.

2. Instalación y ejecución
   1. Clonar repositorio con el siguiente comando: git clone https://github.com/Pablodr89/prueba-velora.git
   2. Instalar dependencias con el siguiente comando: npm install
   3. Correr la aplicación: npm run dev
   4. Para lanzar los test: npm run test

3. Versiones utilizadas
   React => 19.2.0
   React-router-dom => 7.12.0
   Vite => 7.2.4
   Zustand => 5.0.10
   Tanstack Query => 5.90.17
   TailwindCSS => 3.4.19
   Postcss => 8.5.6
   Autoprefixer => 10.4.23
   Formkit/drag-and-drop => 0.5.3
   Jest => 30.2.0

4. Estructura del proyecto
   Usamos un patrón organizado basado en Feature-Driven Development (desarrollo guiado por funcionalidades) y Modularización.

   Carpetas Principales de la Arquitectura:
   - src/api: Contiene las configuraciones de servicios externos para realizar las peticiones a la PokéAPI.
   - src/components: Aquí residen los bloques de construcción reutilizables de la interfaz. Se divide en subcarpetas para componentes específicos (como modales o spinners) y archivos generales como cartas de Pokémon.
   - src/context: Es donde tenemos pequeña lógica para usar los modales que aparecen en distintos momentos de la app.
   - src/stores: Es donde tenemos la lógica de Zustand. Es el "cerebro" que maneja la lógica de combate y selección de equipos.
   - src/hooks: Almacena lógica personalizada (Custom Hooks) para separar la lógica de negocio de la vista.
   - src/layouts: Define la estructura general de las páginas (ej. dónde va el Navbar y el Footer).
   - src/mappers: Una capa muy útil para transformar los datos "sucios" que vienen de la API en objetos limpios con las propiedades exactas que tu app necesita.
   - src/utils: Funciones de ayuda genéricas.
   - src/views: Contiene las páginas completas. A diferencia de un componente pequeño, una "view" representa una pantalla entera.

5. Cosas a mejorar o a implementar si se tuviera más tiempo
   - Creo que algo más sostenible y que mejoraría la experiencia, seria tener un pequeño backend con una BD donde guardemos equipos, con los pokemon y de esta manera dar la posibilidad de poder cambiar nombres de equipos o sacar y meter pokemon nuevos en equipos concretos.
   - Mejoraría la lógica de combate, tendría en cuenta los puntos de vida de cada pokemon, las debilidades dependiendo del tipo de pokemon y los distintos movimientos que tiene cada pokemon.
   - Mejoraría la UI del combate, llevando a un segundo nivel el proceso de cada combate.
   - Añadiría un modal o una nueva vista en la que se pudieran ver las stats de cada pokemon.
   - Una mejor UI/UX para mejor experiencia del usuario en general.
