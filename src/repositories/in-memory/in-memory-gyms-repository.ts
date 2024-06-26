import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from "crypto";

export class InMemoryGymsRepositories implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(), // if i receive a id, i use it, if i dont (doesnt exists) uses random UUID
            title: data.title,
            description: data.description ?? null, // if doesnt exists put null
            phone: data.phone ?? null, // if doesnt exists put null
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        }

        this.items.push(gym)

        return gym
    }
}

