import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // Datos considerados frescos por 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos en memoria antes de garbage collection
      refetchOnWindowFocus: false, // En mobile no hace falta refetchear al alternar ventanas
    },
  },
});
