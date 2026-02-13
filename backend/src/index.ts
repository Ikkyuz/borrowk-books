import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { corsMiddleware } from "./shared/middleware/cors";
import { appFeatures } from "./features/app";
import jwt from "@elysiajs/jwt";

const app = new Elysia()
  .use(corsMiddleware)
  .onError(({ code, error, set }) => {
      console.error(`Elysia Error [${code}]:`, error);
      
      if (error.message.includes("Unauthorized")) {
          set.status = 401;
          return { error: error.message };
      }
      
      if (error.message.includes("Forbidden")) {
          set.status = 403;
          return { error: error.message };
      }

      if (code === 'VALIDATION') {
          set.status = 400;
          return { error: "Validation failed", details: error.all };
      }

      set.status = 500;
      return { error: error.message || "Internal Server Error" };
  })
  .use(jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET || "supersecret",
  }))
  .use(swagger({ 
      path: "/docs",
      documentation: {
          info: { title: 'Borrow Books API', version: '1.0.0' },
          components: {
              securitySchemes: {
                  bearerAuth: {
                      type: 'http',
                      scheme: 'bearer',
                      bearerFormat: 'JWT'
                  }
              }
          }
      }
  }))
  .use(appFeatures)
  .get("/", () => "Hello API")
  .listen({ port: process.env.PORT ?? 3000 });

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}/docs`
);
