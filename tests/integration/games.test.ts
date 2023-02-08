import {faker} from '@faker-js/faker';
import { cleanDb } from '../helper';
import supertest from 'supertest';
import app from 'app';

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