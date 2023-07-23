const { User } = require('../models'); // Make sure the path to the User model is correct
const userData = require('./user-seeds.json');

const seedUsers = async () => {
  await User.bulkCreate(userData);
};

module.exports = seedUsers;
