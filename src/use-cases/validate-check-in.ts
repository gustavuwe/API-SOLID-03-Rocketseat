import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

import dayjs from "dayjs"
import { LateCheckInValidationError } from "./errors/late-chek-in-validation-error";

interface ValidateCheckinUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckinUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({
    checkInId
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff( // returns difference from now to the date that checkin was created
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date() // validates checkIn

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    };
  }
}
