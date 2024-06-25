import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface IRegisterUseCaseResponse {
  user: User;
}

// SOLID

// D - Dependency Inversion Principle
// esse príncipio afirma que eu tenho que ter uma inversão de dependência, ou seja desacoplar o máximo que der a instancia de uma classe, pois supondo um
// cenário que eu queria trocar de ORM por exemplo, não vou precisar ficar mudando instância pois estou fazendo a inversão de dependência e recebendo qual
// classe quero instanciar, eu passo no meu controller.

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6); // password encrypted in 6 rounds

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
