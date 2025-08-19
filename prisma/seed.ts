import { prisma } from '@/lib/prisma';

async function seedJobs() {
  console.log('Seeding jobs...');

  // Check if jobs already exist
  const existingJobs = await prisma.job.findMany();
  if (existingJobs.length > 0) {
    console.log('Jobs already exist, skipping seed.');
    return;
  }

  // Create the two static jobs from the original data
  const jobs = [
    {
      title: 'Licensed Plumber',
      location: 'LBI, NJ',
      jobType: 'Full-time',
      department: 'Plumbing',
      excerpt: 'Seeking an experienced and licensed plumber to join our team. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing used for water distribution and waste water disposal in residential and commercial structures.',
      description: 'Express Plumbing is looking for a dedicated and skilled Licensed Plumber to provide top-quality service to our residential and commercial clients in the Long Beach Island area. We pride ourselves on professionalism, reliability, and customer satisfaction.',
      requirements: `Valid New Jersey Plumbing License is required.
Proven experience as a plumber (minimum 3-5 years preferred).
Solid understanding of water distribution and waste water disposal systems in residential and commercial buildings.
Working knowledge of heating and ventilation systems as well as appliances.
Ability to handle plumbing tools and equipment (pipe wrenches, pipe cutters, plungers etc.).
Good communication and interpersonal skills.
Ability to work independently and solve problems effectively.
Valid driver's license with a clean driving record.`,
      benefits: `Competitive salary and performance bonuses.
Comprehensive health, dental, and vision insurance.
Paid time off and holidays.
Company vehicle and tools provided.
Opportunities for continued training and career advancement.
Supportive and friendly team environment.`,
      salary: '$55,000 - $75,000 annually',
      isActive: true,
    },
    {
      title: 'HVAC Technician',
      location: 'Brick, NJ',
      jobType: 'Full-time',
      department: 'HVAC',
      excerpt: 'Join our HVAC team! We are looking for a skilled HVAC Technician to install, maintain, and repair heating, ventilation, cooling, and refrigeration systems for our valued customers.',
      description: 'Express Plumbing is seeking a knowledgeable and experienced HVAC Technician to serve our customers in Brick, NJ and surrounding areas. The ideal candidate will be proficient in troubleshooting, repairing, and installing various HVAC systems.',
      requirements: `Proven experience as an HVAC technician (minimum 2-3 years preferred).
EPA Universal Certification required.
Strong understanding of HVAC functions, troubleshooting, and maintenance.
Proficient in reading schematics and work plans.
Excellent problem-solving and communication skills.
Ability to work independently and as part of a team.
Valid driver's license and clean driving record.`,
      benefits: `Competitive hourly wage and overtime opportunities.
Health, dental, and vision insurance.
Retirement plan options.
Company-provided vehicle and major tools.
Ongoing training and professional development.
Positive and collaborative work environment.`,
      salary: '$22 - $32 per hour',
      isActive: true,
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }

  console.log('Jobs seeded successfully!');
}

async function seedAdmin() {
  console.log('Seeding admin user...');

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: 'ADMIN',
    },
  });

  if (existingAdmin) {
    console.log('Admin user already exists, skipping seed.');
    return;
  }

  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@expressplumbing.com',
      name: 'Express Plumbing Admin',
      role: 'ADMIN',
    },
  });

  console.log('Admin user seeded successfully!');
  console.log('Admin email: j.browning527@gmail.com');
  console.log('Note: You will need to create this user in Firebase Authentication as well.');
}

async function main() {
  try {
    await seedJobs();
    await seedAdmin();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

