import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }); // validate the user but doesnt look to header (authorization: bearer token), only to the cookie

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/", // all paths of backend can access the token
      secure: true, // use https system
      sameSite: true, // only in this site
      httpOnly: true, // only backend can access, frontend can not.
    })
    .status(200)
    .send({
      token,
    });
}
