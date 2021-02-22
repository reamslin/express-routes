process.env.NODE_ENV = 'test';

const request = require("supertest");

const app = require('./app')
let items = require('./fakeDb')

let cheese = { name: "cheese", price: 4.99 }

beforeEach(function () {
    items.push(cheese)
});

describe("GET /items", function () {
    test("Gets a list of items", async function () {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([cheese])
    });
});

describe("GET /items/:name", function () {
    test("Gets item data", async function () {
        const resp = await request(app).get('/items/cheese');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(cheese)
    });
    test("Responds with 404 if invalid name", async function () {
        const resp = await request(app).get('/items/bananas');
        expect(resp.statusCode).toBe(404);
    });
});

describe("POST /items", function () {
    test("Creates a new item", async function () {
        const resp = await request(app)
            .post('/items')
            .send({
                name: "crackers",
                price: 2.99
            });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            added: { name: "crackers", price: 2.99 }
        });
    });
});

describe("PATCH /items", function () {
    test("Updates an item", async function () {
        const resp = await request(app)
            .patch('/items/cheese')
            .send({
                name: "cheese",
                price: 3.99
            });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(
            {
                updated:
                    { name: "cheese", price: 3.99 }
            });
    });
    test("Responds with 404 if invalid name", async function () {
        const resp = await request(app).patch('/items/bananas');
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items", function () {
    test("Deletes an item", async function () {
        const resp = await request(app).delete('/items/cheese');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            message: "deleted"
        });
    });
    test("Responds with 404 if not found", async function () {
        const resp = await request(app).delete('/items/bananas');
        expect(resp.statusCode).toBe(404);

    });
});

afterEach(function () {
    items.length = 0;
});