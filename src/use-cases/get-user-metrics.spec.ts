import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-checkins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkinsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get user metrics Use Case", () => {
  beforeEach(async () => {
    checkinsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkinsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkinsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkinsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
