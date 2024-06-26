import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface ISearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface ISearchGymsUseCaseResponse {
  gyms: Gym[];
}

// SOLID

// D - Dependency Inversion Principle
// esse príncipio afirma que eu tenho que ter uma inversão de dependência, ou seja desacoplar o máximo que der a instancia de uma classe, pois supondo um
// cenário que eu queria trocar de ORM por exemplo, não vou precisar ficar mudando instância pois estou fazendo a inversão de dependência e recebendo qual
// classe quero instanciar, eu passo no meu controller.

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return {
      gyms
    };
  }
}
