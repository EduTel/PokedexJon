# 📱 Pokédex App (React Native)

Aplicación móvil de Pokédex construida con **React Native (0.87.1)** y **React 19**, implementando **Clean Architecture**, soporte sin conexión (offline-first) con persistencia en **MMKV**, gestión de estado asíncrono y caché con **TanStack Query** e interfaz moderna con **React Native Paper (Material Design 3)**.

---

## 📸 Capturas de Pantalla (Screenshots)

### 📱 Vistas Principales (iOS vs Android Móvil)

| Pantalla | iOS | Android |
| :--- | :---: | :---: |
| **Lista Principal (`HomeScreen`)** | <img src="./img-doc/ios/HomeScreen-ios.png" width="280" alt="HomeScreen iOS" /> | <img src="./img-doc/android/HomeScreen-android.png" width="280" alt="HomeScreen Android" /> |
| **Detalle del Pokémon (`DetailScreen`)** | <img src="./img-doc/ios/DetailScreen-ios.png" width="280" alt="DetailScreen iOS" /> | <img src="./img-doc/android/DetailScreen-android.png" width="280" alt="DetailScreen Android" /> |

### 📟 Adaptabilidad en Tablet

| Lista Principal (`HomeScreen Tablet`) | Detalle del Pokémon (`DetailScreen Tablet`) |
| :---: | :---: |
| <img src="./img-doc/android/HomeScreen-android-tablet.png" width="480" alt="HomeScreen Android Tablet" /> | <img src="./img-doc/android/DetailScreen-android-tablet.png" width="480" alt="DetailScreen Android Tablet" /> |


### 🛠️ Manejo de Estados de la UI (Feedback al Usuario)

| Estado de Carga (`Skeleton`) | Modo Sin Conexión (`Offline`) |
| :---: | :---: |
| <img src="./img-doc/android/Skeleton-HomeScreen-android.png" width="280" alt="Skeleton Loading State" /> | <img src="./img-doc/android/Offline-HomeScreen-android.png" width="280" alt="Offline Banner State" /> |

| Estado de Error (`ErrorState`) | Estado Vacío (`EmptyState`) |
| :---: | :---: |
| <img src="./img-doc/android/Error-HomeScreen-android.png" width="280" alt="Error State" /> | <img src="./img-doc/android/Empty-HomeScreen-android.png" width="280" alt="Empty State" /> |

### 🔍 Evidencias de Depuración con Rozenite DevTools

| Árbol de Navegación (`React Navigation`) | Inspección de Caché y Persistencia (`MMKV Storage`) |
| :---: | :---: |
| <img src="./img-doc/stackNavigator.png" width="380" alt="Rozenite React Navigation Tree" /> | <video src="./img-doc/storageMmkv.mp4" width="380" controls></video><br/>[▶️ Ver video de persistencia (`storageMmkv.mp4`)](./img-doc/storageMmkv.mp4) |

---

## 🚀 Guía de Inicio Rápido

### 🤖 Pasos para Android

1. **Instalar dependencias con npm**:
   Desde la ruta raíz del proyecto:
   ```bash
   npm install
   ```

2. **Iniciar Metro Bundler en la ruta raíz**:
   ```bash
   npm run start
   ```
   > 💡 **Nota**: Metro iniciará con la suite **Rozenite** habilitada para depurar almacenamiento MMKV, red y navegación.

3. **Compilar y ejecutar en Android**:
   En una **segunda terminal** (en la ruta raíz):
   ```bash
   npm run android
   ```

---

### 🍏 Pasos para iOS

1. **Instalar dependencias con npm**:
   Desde la ruta raíz del proyecto:
   ```bash
   npm install
   ```

2. **Instalar dependencias nativas (CocoaPods)**:
   ```bash
   cd ios && pod install && cd ..
   ```
   *(O mediante Bundler: `bundle install && bundle exec pod install`)*

3. **Iniciar Metro Bundler en la ruta raíz**:
   ```bash
   npm run start
   ```

4. **Compilar y ejecutar en iOS**:
   En una **segunda terminal** (en la ruta raíz):
   ```bash
   npm run ios
   ```

---

### 🧪 Ejecución de Pruebas (Testing)

#### Pruebas Unitarias y de Integración (Jest)
Para ejecutar la suite completa de pruebas unitarias y de integración con **Jest** y **React Native Testing Library**:

```bash
npm run test
```

##### 🎥 Evidencia de Ejecución de Pruebas con Jest

<video src="./img-doc/jest.mp4" width="600" controls></video><br/>
[▶️ Ver video de pruebas con Jest (`jest.mp4`)](./img-doc/jest.mp4)

#### Pruebas End-to-End E2E (Maestro)
Para ejecutar las pruebas automáticas de extremo a extremo con el emulador o dispositivo conectado (se requiere tener instalado Maestro en el sistema y el emulador/dispositivo en ejecución):

```bash
# Ejecutar flujo E2E con Maestro
npm run test:e2e
# o directamente con el CLI
maestro test maestro/pokedex_flow.yaml
```

##### 🎥 Evidencia de Ejecución E2E con Maestro

<video src="./img-doc/maestro.mp4" width="600" controls></video><br/>
[▶️ Ver video de ejecución de pruebas Maestro (`maestro.mp4`)](./img-doc/maestro.mp4)

#### 🛡️ Análisis de Seguridad y Vulnerabilidades (Trivy)
Para realizar un análisis del sistema de archivos en busca de vulnerabilidades con severidad `HIGH` y `CRITICAL` excluyendo carpetas de artefactos de compilación:

```bash
npm run security:trivy
```

#### 📊 Gráfico de Dependencias de la Arquitectura (dependency-cruiser)
Genera un diagrama visual en formato SVG (`dependency-graph.svg`) para analizar y auditar las dependencias e importaciones de la aplicación a partir de `App.tsx`:

> 💡 **Requisitos previos**:
> - Requiere tener instalado **Graphviz** en el sistema para utilizar el comando `dot` (en macOS: `brew install graphviz`, en Linux/Ubuntu: `sudo apt install graphviz`).
> - Utiliza `npx` bajo demanda, por lo que **no** requiere instalar paquetes globales de Node.js.

```bash
# Generar el diagrama SVG con npm
npm run dependency-cruiser

# O directamente mediante npx:
npx depcruise --no-config --ts-config ./tsconfig.json --max-depth 8 --exclude 'node_modules|react-native' --output-type dot App.tsx | dot -T svg > dependency-graph.svg
```

##### 🗺️ Diagrama de Dependencias Generado

<p align="center">
  <img src="./dependency-graph.svg" alt="Gráfico de dependencias de la arquitectura" width="100%" />
</p>

[▶️ Ver o descargar archivo vectorial completo (`dependency-graph.svg`)](./dependency-graph.svg)

---

### 🔄 Integración Continua (GitHub Actions)

El proyecto cuenta con un workflow automatizado en [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) que se ejecuta en cada `push` o `pull_request` a la rama `main`:

1. **Instalación limpia y reproducible** con `npm ci` y caché de dependencias.
2. **Análisis de código estático (Linter)** con `npm run lint` (ESLint).
3. **Comprobación de tipos (Type Checking)** con `npm run typecheck` (TypeScript sin emisión de archivos).
4. **Ejecución de Pruebas Automatizadas** con `npm test -- --ci --maxWorkers=2` (Jest).

---

## 🏛️ Arquitectura y Desacoplamiento de Red (Clean Architecture)

El proyecto implementa los principios de **Clean Architecture** e **Inversión de Dependencias (DIP)** para garantizar que **la capa visual esté 100% desacoplada de la implementación de red y persistencia**.

### 🔄 Diagrama del Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                     Capa Visual (UI)                        │
│             HomeScreen.tsx  /  DetailScreen.tsx             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Consume estado y acciones
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      Custom Hooks                           │
│           usePokemonList()  /  usePokemonDetail()           │
│              (Gestión de estado con TanStack Query)         │
└──────────────────────────────┬──────────────────────────────┘
                               │ Inyección de Dependencias
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Casos de Uso (Application)                  │
│       GetPokemonListUseCase  /  GetPokemonDetailUseCase     │
└──────────────────────────────┬──────────────────────────────┘
                               │ Depende sólo de abstracciones
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                Contrato de Dominio (Domain)                 │
│              interface IPokemonRepository                   │
└──────────────────────────────▲──────────────────────────────┘
                               │ Implementa la interfaz
┌──────────────────────────────┴──────────────────────────────┐
│             Implementación de Datos (Data)                  │
│                  PokemonRepositoryImpl                      │
│                                                             │
│       ┌─────────────────────────┴─────────────────────────┐ │
│       ▼                                                   ▼ │
│  [Fuente Local]                                   [Fuente Remota]   │
│  MMKVStorageDataSource                            PokeApiDataSource │
│  (Caché offline ultrarrápido)                     (fetch / URLs)    │
└─────────────────────────────────────────────────────────────┘
```

### 🧩 Puntos Clave del Desacoplamiento:

1. **Cero dependencias de red en la UI**:
   - Ninguna pantalla o componente de presentación (`src/presentation/`) importa `fetch`, `axios`, URLs, endpoints o códigos de estado HTTP (200, 404, 500).
   - Las pantallas únicamente reciben entidades puras de dominio ([`Pokemon`](./src/domain/models/pokemon.model.ts) y [`PokemonDetail`](./src/domain/models/pokemon-detail.model.ts)).

2. **Inversión de Dependencias (DIP)**:
   - Los casos de uso dependen exclusivamente del contrato abstracto [`IPokemonRepository`](./src/domain/repositories/pokemon.repository.interface.ts) (Capa de Dominio).
   - [`PokeApiDataSource`](./src/data/datasources/remote/poke-api.datasource.ts) es el **único** archivo que conoce la URL base (`https://pokeapi.co/api/v2`) y realiza llamadas de red `fetch()`. Si en el futuro se cambia a Axios, GraphQL o gRPC, la UI y los casos de uso permanecen intactos.

3. **Mapeo de Datos (Data Mappers)**:
   - [`PokemonMapper`](./src/data/mappers/pokemon.mapper.ts) transforma las respuestas crudas de red (DTOs) en modelos de dominio limpios, protegiendo a la aplicación ante cambios en los contratos de la API externa.

4. **Soporte Offline Transparente**:
   - [`PokemonRepositoryImpl`](./src/data/repositories/pokemon.repository.impl.ts) orquesta la llamada remota y el almacenamiento en caché local (`MMKVStorageDataSource`). Si no hay conexión o la petición falla, entrega automáticamente los datos guardados en caché sin que la capa visual tenga que gestionar lógica de reintento o almacenamiento.

5. **Testabilidad Aislada**:
   - Permite que las pruebas unitarias y de integración de pantallas (`HomeScreen.test.tsx`, `DetailScreen.test.tsx`) se ejecuten sin mockear el objeto global `fetch` ni simular llamadas de red; simplemente se sustituye el Caso de Uso a través del contenedor de inyección de dependencias ([`RenderHelper`](./test-utils/RenderHelper.tsx)).

---

## ♿ Accesibilidad (A11y & WCAG)

La interfaz cumple con los estándares de accesibilidad para lectores de pantalla (**TalkBack** en Android y **VoiceOver** en iOS) y pautas **WCAG 2.1**:

1. **Soporte para Lectores de Pantalla**:
   - **Etiquetas y Roles Semánticos**: Implementación de `accessibilityRole` (`"button"`, `"header"`, `"alert"`, `"text"`), `accessibilityLabel`, `accessibilityHint` y 'aria-hidden={true}' en tarjetas, botones de acción y encabezados.
   - **Tarjetas de Pokémon**: Anuncian nombre, número y acción (*"Bulbasaur, número #001. Toca dos veces para ver los detalles"*).
2. **Tamaños Táctiles Adecuados (Touch Target Size)**:
   - Los controles interactivos cumplen con el tamaño táctil mínimo recomendado de **44x44 dp (iOS)** y **48x48 dp (Android)** mediante dimensionamiento nativo
3. **Contraste de Color Dinámico (WCAG AAA / AA)**:
   - Texto principal `#212121` sobre `#FFFFFF` con ratio de contraste **~16:1** (superando WCAG AAA).
   - Adaptación dinámica en chips de tipos: tipos con fondo claro (*Eléctrico*, *Hada*, *Hielo*, *Tierra*)

---

se elimino libreria @react-native/new-app-screen que no aportaba nada al proyecto y ocupaba espacio y recursos.

## 📦 Justificación de Librerías y Ventajas Técnicas

A continuación se detalla por qué se eligió cada librería y el valor técnico que aporta al proyecto:

### 1. Navegación y Rendimiento de Pantallas

#### `@react-navigation/native` & `@react-navigation/native-stack`

- **Ventajas**:
  - A diferencia del stack en JavaScript (`@react-navigation/stack`), `native-stack` se apoya en los controladores de vista nativos reales (`UINavigationController` en iOS y `Fragment` en Android).
- **Evidencia con Rozenite**: Árbol de navegación y stack capturados en [`img-doc/stackNavigator.png`](./img-doc/stackNavigator.png).

#### `react-native-screens`

- **¿Por qué es necesaria?**: Es el pilar nativo requerido por `@react-navigation/native-stack`

#### `@legendapp/list` (LegendList)

- **¿Por qué es necesaria?**: Reemplazo de alto rendimiento para `FlatList` con reciclaje de vistas 100% en JS sin necesidad de módulos nativos.
- **Ventajas**:
  - Scroll fluido a 60/120 FPS sin los problemas de salto o espacios en blanco de `FlatList`.
  - Reciclaje inteligente de celdas con soporte nativo para `estimatedItemSize` y tamaños dinámicos.

---

### 2. Interfaz de Usuario y Diseño (UI)

#### `react-native-paper`

- **¿Por qué es necesaria?**: UI Kit oficial basado en **Material Design 3 (MD3)** para React Native.
  - Sistema de temas centralizado (`PaperProvider` y `theme.ts`), permitiendo personalizar la paleta de colores (Rojo, badges etc).
  - Accesibilidad nativa (A11y) y adaptación responsiva a diferentes densidades y tamaños de pantalla.

#### `@react-native-vector-icons/material-design-icons`

- **¿Por qué es necesaria?**: Provee la iconografía vectorial que acompaña los componentes de `react-native-paper`

---

### 3. Persistencia y Almacenamiento Local

#### `react-native-mmkv`

- **¿Por qué es necesaria?**: persistencia local
- **Ventajas**:
  - **Hasta 30x más rápido que `AsyncStorage`**:
- **Evidencia con Rozenite**: Video demostrativo de inspección de caché y persistencia reactiva en tiempo real en [`img-doc/storageMmkv.mp4`](./img-doc/storageMmkv.mp4).

#### `react-native-nitro-modules`

- **¿Por qué es necesaria?**: Es la dependencia base nativa de `react-native-mmkv`

---

### 4. Gestión de Estado Asíncrono y Caché

#### `@tanstack/react-query`

- **¿Por qué es necesaria?**: Administra el ciclo de vida de las peticiones a la PokeAPI y su almacenamiento en memoria.
- **Ventajas**:
  - Provee estados automáticos y reactivos: `isLoading`, `isError`, `data`, `isFetching`, `refetch`.
  - Deduplica peticiones duplicadas.

---

### 5. Estabilidad y Manejo de Errores

#### `react-native-error-boundary`

- **¿Por que es necesaria?**: Captura excepciones no controladas de JavaScript dentro del ciclo de renderizado de componentes React.

#### `react-native-exception-handler`

- **¿Por que es necesaria?**: Captura errores globales que escapan del ciclo de vida de React y da la posibilad de ejecutar codigo primordial antes de cerrar la app.

#### `@react-native-community/netinfo`

- Monitorea el estado real de la conexión de red (Wi-Fi, celular, modo avión) a nivel de sistema operativo.

---

### 6. Herramientas

#### `babel-plugin-module-resolver`

- Permite configurar y resolver **alias de rutas absolutas** (`@components/*`, `@hooks/*`, `@domain/*`, `@data/*`, `@core/*`, `@di/*`)

#### `babel-plugin-react-compiler`

- Es el nuevo compilador optimizador oficial creado por el equipo de Meta/React Core para React 19. Transforma el código durante la fase de transpilación con Babel.
- **Ventajas**:
  - **Elimina la necesidad de usar manualmente `useMemo`, `useCallback` y `React.memo`**: El compilador analiza automáticamente el grafo de dependencias y memoriza componentes y valores calculados sin intervención humana.
  - **Rendimiento óptimo automático**: Evita re-renderizados innecesarios en toda la interfaz (especialmente beneficioso al scrollear la `FlatList` de Pokemon)

#### `@testing-library/react-native`

- Es el estándar oficial de la industria para escribir pruebas unitarias y de integración sobre componentes de React Native.

#### `patch-package`

- Permite modificar, parchear y corregir bugs en librerías dentro de `node_modules` de forma persistente y reproducible. se implemento en react-native-exception-handler

#### `@rozenite/metro`

- Plugin de empaquetado para Metro desarrollado por **Callstack** para integrar la suite de herramientas de depuración **Rozenite** en React Native.
- **Evidencias en el proyecto**:
  - **React Navigation**: Inspección del historial de rutas y stack de navegación ([`img-doc/stackNavigator.png`](./img-doc/stackNavigator.png)).
  - **Storage Plugin**: Monitoreo reactivo de la base de datos MMKV (`pokedex-storage`) ([`img-doc/storageMmkv.mp4`](./img-doc/storageMmkv.mp4)).
