import { getWsUrl } from "@/lib/socket";
import { useWebSocket } from "ahooks";
import { useRef } from "react";

export function useHydroWebSocket(
  path: string,
  params: Record<string, string> = {},
  options: Parameters<typeof useWebSocket>[1] = {}
) {
  const { onOpen, onMessage, onClose, ...rest } = options;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useWebSocket(getWsUrl(path, params), {
    reconnectLimit: 100,
    reconnectInterval: 10000,
    onOpen: (_, ws) => {
      timerRef.current = setInterval(() => {
        ws.send("ping");
      }, 30000);
      onOpen?.(_, ws);
    },
    onMessage: (msg, ws) => {
      if (msg.data === "pong") return;
      if (msg.data === "ping") {
        ws.send("pong");
        return;
      } else {
        onMessage?.(msg, ws);
      }
    },
    onClose: (_, ws) => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      onClose?.(_, ws);
    },
    ...rest,
  });
}
