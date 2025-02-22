import type { NitroApp } from "nitropack/types";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server({ cors: { origin: "http://localhost:3000" } });

  io.bind(engine);

  io.on("connection", (socket) => {
    socket.on("nav", (direction, callback) => {
      io.emit("nav", direction);
      callback({ success: true });
    });
    socket.on("reviews:flush", (callback) => {
      io.emit("reviews:flush");
      callback({ success: true });
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        // @ts-expect-error
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          // @ts-expect-error private method and property
          engine.prepare(peer._internal.nodeReq);
          // @ts-expect-error private method and property
          engine.onWebSocket(
            // @ts-expect-error private method and property
            peer._internal.nodeReq,
            // @ts-expect-error private method and property
            peer._internal.nodeReq.socket,
            peer.websocket,
          );
        },
      },
    }),
  );
});
