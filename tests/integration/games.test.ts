import {faker} from '@faker-js/faker';
import { cleanDb } from '../helper';
import supertest from 'supertest';
import app from 'app';
import { createGame } from '../factories/games-factory';
import { createConsole } from '../factories/console-factories';

beforeEach(async () => {
    await cleanDb()
});

const server = supertest(app);

describe("GET /games", () => {
    it("status", async () => {
        const result = await server.get("/games");
        expect(result.status).toBe(200);
    })
})

describe("GET /games/:id", () => {
    it("id", async () => {
        const result = await server.get("/games/0");
        expect(result.status).toBe(404);
    })
})

describe("POST /games", () => {
    it("should response with status 422 if body is invalid", async () => {
        const result = await server.post("/games").send({title: faker.datatype.number(), consoleId: faker.lorem.sentence()});
        expect(result.status).toBe(422);
    })

    it("should response with status 409 if title already exists", async () => {
        const game = await createGame();
        const result = await server.post("/games").send({title: game.title, consoleId: game.consoleId});
        expect(result.status).toBe(409);
    })

    it("should response with status 409 if console doesn't exists", async () => {
        await createConsole()
        const result = await server.post("/games").send({title: faker.lorem.sentence(), consoleId: faker.datatype.number()});
        expect(result.status).toBe(409);
    })

    it("should response with status 201 if body is valid", async () => {
        const console = await createConsole()
        const result = await server.post("/games").send({title: faker.lorem.sentence(), consoleId: console.id});
        expect(result.status).toBe(201);
    })
})