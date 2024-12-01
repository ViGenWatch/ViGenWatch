import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onclose = () => {
      setConnected(false);
      setTimeout(() => {
        if (ws.readyState === WebSocket.CLOSED) {
          setSocket(new WebSocket(url));
        }
      }, 3000);
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    setSocket(ws);
  }, [url]);

  return { socket, connected };
};
