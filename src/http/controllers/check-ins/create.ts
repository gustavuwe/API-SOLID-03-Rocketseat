import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      // implements latitude verification
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      // implements longitude verification
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const checkinUseCase = makeCheckInUseCase(); // substitutes instance of classes

  await checkinUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude
  });

  return reply.status(201).send();
}
