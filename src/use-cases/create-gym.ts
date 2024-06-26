import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface ICreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface ICreateGymUseCaseResponse {
  gym: Gym;
}

// SOLID

// D - Dependency Inversion Principle
// esse príncipio afirma que eu tenho que ter uma inversão de dependência, ou seja desacoplar o máximo que der a instancia de uma classe, pois supondo um
// cenário que eu queria trocar de ORM por exemplo, não vou precisar ficar mudando instância pois estou fazendo a inversão de dependência e recebendo qual
// classe quero instanciar, eu passo no meu controller.

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGymUseCaseRequest): Promise<ICreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
