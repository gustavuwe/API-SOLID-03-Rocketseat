import Fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/users/register";
import { ZodError } from "zod";
import { userRoutes } from "./http/controllers/users/routes";
import { env } from "../src/env";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./http/controllers/gyms/routes";

export const app = Fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
