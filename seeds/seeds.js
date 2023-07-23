const sequelize = require('../config/connection');
const { User, Blogs } = require('../models');
const userData = require('./user-seeds.json');
const blogsData = require('./blogs-seeds.json');

const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

const seedBlogs = async () => {
  await Blogs.bulkCreate(blogsData);
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedBlogs();

  process.exit(0);
};

seedDatabase();
