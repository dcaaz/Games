import { faker } from "@faker-js/faker";
import prisma from "config/database";
import { createConsole } from "./console-factories";

export async function createGame() {
    const console = await createConsole();

    return await prisma.game.create({
        data: {
         title: faker.lorem.sentence(),
         consoleId: console.id
        }
      });
}