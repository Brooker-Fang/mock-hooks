import { useEffect, useState } from 'react';

export interface NetworkState {
  since?: Date;
  online?: boolean;
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

function getConnection() {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}
function getConnectionProperty(): NetworkState {
  const c = getConnection();
  if (!c) return {};
  const { rtt, type, saveData, downlink, downlinkMax, effectiveType } = c;
  return {
    rtt,
    type,
    saveData,
    downlink,
    downlinkMax,
    effectiveType,
  };
}
function useNetwork(): NetworkState {
  const [state, setState] = useState(() => {
    return {
      since: undefined,
      online: navigator?.onLine,
      ...getConnectionProperty(),
    };
  });
  useEffect(() => {
    const onOnline = () => {
      setState((prev) => ({
        ...prev,
        online: true,
        since: new Date(),
      }));
    };
    const onOffline = () => {
      setState((prev) => ({
        ...prev,
        online: false,
        since: new Date(),
      }));
    };
    const onConnectionChange = () => {
      setState((prev) => ({
        ...prev,
        ...getConnectionProperty(),
      }));
    };
    window.addEventListener(NetworkEventType.ONLINE, onOnline);
    window.addEventListener(NetworkEventType.OFFLINE, onOffline);
    const connection = getConnection();
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);
    return () => {
      window.removeEventListener(NetworkEventType.ONLINE, onOnline);
      window.removeEventListener(NetworkEventType.OFFLINE, onOffline);
      connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
    };
  }, []);
  return state;
}

export default useNetwork;
