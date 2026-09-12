import React from 'react';
import { screen, fireEvent } from '@testing-library/react-native';
import { LoadingState } from '../../src/presentation/components/LoadingState';
import { ErrorState } from '../../src/presentation/components/ErrorState';
import { EmptyState } from '../../src/presentation/components/EmptyState';
import { RenderHelper } from '../../test-utils/RenderHelper';

describe('Estados Visuales', () => {
  describe('LoadingState', () => {
    it('debe mostrar el mensaje de carga configurado', async () => {
      await RenderHelper(<LoadingState message="Cargando datos..." />);
      expect(screen.getByText('Cargando datos...')).toBeTruthy();
      expect(screen.getByTestId('loading-state')).toBeTruthy();
    });
  });

  describe('ErrorState', () => {
    it('debe mostrar el mensaje de error y ejecutar onRetry al presionar reintentar', async () => {
      const handleRetry = jest.fn();
      await RenderHelper(
        <ErrorState
          message="No hay conexión a internet"
          onRetry={handleRetry}
        />,
      );

      expect(screen.getByText('¡Ups! Algo salió mal')).toBeTruthy();
      expect(screen.getByText('No hay conexión a internet')).toBeTruthy();

      const retryBtn = screen.getByTestId('retry-button');
      fireEvent.press(retryBtn);

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('EmptyState', () => {
    it('debe mostrar el estado vacío correctamente', async () => {
      await RenderHelper(<EmptyState message="No hay resultados disponibles" />);

      expect(screen.getByText('Sin resultados')).toBeTruthy();
      expect(screen.getByText('No hay resultados disponibles')).toBeTruthy();
    });
  });
});
