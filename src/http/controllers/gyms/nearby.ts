import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeSearchGyms } from "@/use-cases/factories/make-search-gyms-use-case";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      // implements latitude verification
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      // implements longitude verification
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);
  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase(); // substitutes instance of classes

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
