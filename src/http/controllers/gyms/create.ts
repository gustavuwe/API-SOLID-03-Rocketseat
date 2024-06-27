import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeCreateGymUseCaSe } from "@/use-cases/factories/make-create-gym-use-case";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      // implements latitude verification
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      // implements longitude verification
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(request.body);
    const createGymUseCase = makeCreateGymUseCaSe(); // substitutes instance of classes

    await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

  return reply.status(201).send();
}
