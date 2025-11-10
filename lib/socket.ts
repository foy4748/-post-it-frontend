import { io } from "socket.io-client";

export const socket = io(
  String(process.env.NEXT_PUBLIC_API_URL).replace("/api", ""),
  {
    transports: ["websocket", "polling"],
  },
);
