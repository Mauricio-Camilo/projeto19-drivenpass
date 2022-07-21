import prisma from "./../src/config/database.js";


async function main () {
    await prisma.$executeRaw`DELETE FROM sessions`;
    // await prisma.$executeRaw`DELETE FROM users`;

    // await prisma.user.create({
    //     data: {
    //         name: "Nome de teste",
    //         email:"emailTeste10@email.com",
    //         password:"0123456789"
    //     }
    // });
    await prisma.note.create({
        data: {
            userId: 14,
            title: "Titulo da nota teste",
            note:"texto da nota de teste"
        }
    });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})