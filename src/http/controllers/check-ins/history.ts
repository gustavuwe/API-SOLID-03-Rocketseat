import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGyms } from "@/use-cases/factories/make-search-gyms-use-case";
import { makeFetchCheckInsHistory } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchCheckInsHistory(); // substitutes instance of classes

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
