import prisma from "./../src/config/database.js";


async function main () {
    await prisma.$executeRaw`DELETE FROM sessions`;
    await prisma.$executeRaw`DELETE FROM users`;


    await prisma.user.create({
        data: {
            name: "Admin",
            email:"admin1@email.com",
            password:"012345678910"
        }
    });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})