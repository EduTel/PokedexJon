import React, { useRef } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import { queryClient } from './src/core/config/query-client';
import { ApiProvider, apiServices } from './src/di';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { theme } from './src/presentation/theme/theme';
import FallbackUI from './src/presentation/components/FallbackUI';
import { useNetworkActivityDevTools } from '@rozenite/network-activity-plugin';
import {
  createMMKVStorageAdapter,
  useRozeniteStoragePlugin,
} from '@rozenite/storage-plugin';
import { useReactNavigationDevTools } from '@rozenite/react-navigation-plugin';
import { storage } from './src/data/datasources/local/mmkv-storage.datasource';

const storages = [
  createMMKVStorageAdapter({
    storages: {
      'pokemon-storage': storage,
    },
  }),
];

function DevToolsInstaller({ navigationRef }: { navigationRef: any }) {
  useRozeniteStoragePlugin({ storages });
  useReactNavigationDevTools({ ref: navigationRef });
  useNetworkActivityDevTools();
  return null;
}

function App(): React.JSX.Element {
  const navigationRef = useRef(null);
  const handleError = (error: Error, stackTrace: string) => {
    console.error(
      'Error no controlado capturado por react-native-error-boundary:',
      error,
      stackTrace,
    );
  };

  return (
    <>
      {__DEV__ && <DevToolsInstaller navigationRef={navigationRef} />}
      <ErrorBoundary FallbackComponent={FallbackUI} onError={handleError}>
        <QueryClientProvider client={queryClient}>
          <ApiProvider service={apiServices}>
            <SafeAreaProvider>
              <PaperProvider theme={theme}>
                <NavigationContainer ref={navigationRef}>
                  <StatusBar barStyle="light-content" />
                  <AppNavigator />
                </NavigationContainer>
              </PaperProvider>
            </SafeAreaProvider>
          </ApiProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
