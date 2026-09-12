import React from 'react';
import { screen } from '@testing-library/react-native';
import { OfflineBanner } from '../../src/presentation/components/OfflineBanner';
import { RenderHelper } from '../../test-utils/RenderHelper';

describe('OfflineBanner', () => {
  it('debe renderizarse y mostrar el texto informativo de modo sin conexión', async () => {
    await RenderHelper(<OfflineBanner />);
    expect(screen.getByTestId('offline-banner')).toBeTruthy();
    expect(
      screen.getByText('Modo sin conexión • Mostrando datos en caché local'),
    ).toBeTruthy();
  });
});
