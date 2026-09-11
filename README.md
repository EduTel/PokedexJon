## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

---

se elimino libreria @react-native/new-app-screen que no aportaba nada al proyecto y ocupaba espacio y recursos.

## 📦 Justificación de Librerías y Ventajas Técnicas

A continuación se detalla por qué se eligió cada librería y el valor técnico que aporta al proyecto:

### 1. Navegación y Rendimiento de Pantallas

#### `@react-navigation/native` & `@react-navigation/native-stack`

- **Ventajas**:
  - A diferencia del stack en JavaScript (`@react-navigation/stack`), `native-stack` se apoya en los controladores de vista nativos reales (`UINavigationController` en iOS y `Fragment` en Android).

#### `react-native-screens`

- **¿Por qué es necesaria?**: Es el pilar nativo requerido por `@react-navigation/native-stack`

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

---

### 6. Herramientas

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

- Plugin de empaquetado para Metro desarrollado por **Callstack** para integrar la suite de herramientas de depuración **Rozenite** en React Native
