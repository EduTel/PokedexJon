/* eslint-env jest */
import { jest } from '@jest/globals';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

console.log("--- JEST SETUP LOADED ---");
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// Mock para react-native-screens
jest.mock('react-native-screens', () => {
  const RealComponent = jest.requireActual('react-native').View;
  return {
    enableScreens: jest.fn(),
    Screen: RealComponent,
    ScreenContainer: RealComponent,
  };
});


jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// Mock react-native-mmkv to prevent NitroModules autolinking check errors
jest.mock('react-native-mmkv', () => {
  const storage = {
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
  };
  return {
    createMMKV: jest.fn(() => storage),
  };
});

// Mock para @legendapp/list/react-native
jest.mock('@legendapp/list/react-native', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    LegendList: React.forwardRef((props, ref) =>
      React.createElement(FlatList, { ...props, ref }),
    ),
  };
});
