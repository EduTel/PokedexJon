import { useNetInfo } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const netInfo = useNetInfo();

  const isOffline =
    netInfo.isConnected === false || netInfo.isInternetReachable === false;

  return {
    isOffline,
    isConnected: netInfo.isConnected ?? true,
    isInternetReachable: netInfo.isInternetReachable,
    connectionType: netInfo.type,
  };
};
