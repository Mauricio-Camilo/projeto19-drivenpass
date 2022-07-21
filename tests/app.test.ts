import prisma from "./../src/config/database.js";
import supertest from "supertest";
import app from "./../src/app.js"
import dotenv from "dotenv";

dotenv.config();

const NAME = "nomeTeste"
const EMAIL = "teste1@email.com";
const PASSWORD = "0123456789";
const signup = {name: NAME, email: EMAIL, password: PASSWORD};
const login = {email: EMAIL, password: PASSWORD};
const note = {userId: 1, title: "titulo da nota", name: "texto da nota"}

describe("User tests suite", () => {
    it("given email and password, create user", async () => {

        await prisma.$executeRaw`DELETE FROM users WHERE email = 'teste1@email.com'`;
        const response = await supertest(app).post("/signup").send(signup);

        const user = await prisma.user.findUnique({where : {email: login.email}});

        expect(user.email).toBe(login.email);
    });

    it("given email and password, login the user", async () => {

        await supertest(app).post("/signup").send(signup);

        const response = await supertest(app).post("/signin").send(login);
        const token = response.text;

        expect(token).not.toBeNull();
    })

    it("given email already in use, fail to create user", async () => {
      const response2 = await supertest(app).post("/signup").send(signup);
      expect (response2.statusCode).toBe(409);
    })
})

describe("Notes tests suite", () => {
    it("invalid token to create note", async () => {

        await prisma.$executeRaw`DELETE FROM notes`;
        const response = await supertest(app).post("/notes").send(note);
        expect(response.statusCode).toBe(404);
    });
})

afterAll(async () => {
    await prisma.$disconnect();
})