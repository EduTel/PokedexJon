import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { theme } from './src/presentation/theme/theme';
import FallbackUI from './src/presentation/components/FallbackUI';

function App(): React.JSX.Element {
  const handleError = (error: Error, stackTrace: string) => {
    console.error(
      'Error no controlado capturado por react-native-error-boundary:',
      error,
      stackTrace,
    );
  };

  return (
    <ErrorBoundary FallbackComponent={FallbackUI} onError={handleError}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
