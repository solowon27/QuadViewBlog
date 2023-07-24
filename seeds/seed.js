const sequelize = require('../config/connection');
const blogPostsData = require('./seed-blogposts');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await blogPostsData();
    
    process.exit(0);
    }

seedDatabase();