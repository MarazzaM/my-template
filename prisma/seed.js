// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insert initial data
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: '$2b$10$SIM2.P14SaV1/9CP79GE5O/OvLvVWC6dQHtpqp4ARNIIycdedVOtO',
    },
  });

  // Add more seeding logic as needed

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
