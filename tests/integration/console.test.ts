import {faker} from '@faker-js/faker';
import { cleanDb } from '../helper';
import supertest from 'supertest';
import app from 'app';
import { createConsole } from '../factories/console-factories';

beforeEach(async () => {
    await cleanDb()
});

const server = supertest(app);

describe("GET /consoles", () => {
    it("status", async () => {
        const result = await server.get("/consoles");
        expect(result.status).toBe(200);
    })
})

describe("GET /consoles/:id", () => {
    it("id", async () => {
        const result = await server.get("/consoles/0");
        expect(result.status).toBe(404);
    })
})

describe("POST /consoles", () => {
    it("should response with status 422 if body is invalid", async () => {
        const result = await server.post("/consoles").send({name: faker.datatype.number()});
        expect(result.status).toBe(422);
    })

    it("should response with status 409 if name already exists", async () => {
        const console = await createConsole();
        const result = await server.post("/consoles").send({name: console.name});
        expect(result.status).toBe(409);
    })

    it("should response with status 201 if body is valid", async () => {
        const result = await server.post("/consoles").send({name: faker.lorem.sentence()});
        expect(result.status).toBe(201);
    })
})