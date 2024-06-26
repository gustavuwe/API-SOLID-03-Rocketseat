import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface IFetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

// SOLID

// D - Dependency Inversion Principle
// esse príncipio afirma que eu tenho que ter uma inversão de dependência, ou seja desacoplar o máximo que der a instancia de uma classe, pois supondo um
// cenário que eu queria trocar de ORM por exemplo, não vou precisar ficar mudando instância pois estou fazendo a inversão de dependência e recebendo qual
// classe quero instanciar, eu passo no meu controller.

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
