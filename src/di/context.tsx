import React, { createContext, useContext, ReactNode } from 'react';
import { ApiServices } from './types';

const ApiServicesContext = createContext<ApiServices | undefined>(undefined);

export interface ApiProviderProps {
  children: ReactNode;
  service: ApiServices;
}

export const ApiProvider = ({ children, service }: ApiProviderProps) => {
  return (
    <ApiServicesContext.Provider value={service}>
      {children}
    </ApiServicesContext.Provider>
  );
};

export const useContextApiServices = (): ApiServices => {
  const context = useContext(ApiServicesContext);
  if (!context) {
    throw new Error('useContextApiServices must be used within an ApiProvider');
  }
  return context;
};
