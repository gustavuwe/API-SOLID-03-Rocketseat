import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT); // on every request the fastify call a hook called verifyJWT that verifyes the jason web token provided. (this was a middleware implemented in /middlewares folder)

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymId/check-ins", create);

  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validate
  );
}
