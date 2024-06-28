import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT) // on every request the fastify call a hook called verifyJWT that verifyes the jason web token provided. (this was a middleware implemented in /middlewares folder)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}