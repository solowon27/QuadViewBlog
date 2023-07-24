
const { Blogs } = require('../models');

const blogPostsData = [
  {
    title: 'First Blog Post',
    content: 'This is the contents of the first blog post.',
    creator: 'John Doe',
    date: '2023-07-20',
  },
  {
    title: 'Second Blog Post',
    content: 'This is the contents of the second blog post.',
    creator: 'Jane Smith',
    date: '2023-07-21',
  },
  {
    title: 'Third Blog Post',
    content: 'This is the contents of the third blog post.',
    creator: 'John Doe',
    date: '2023-07-22',
  },
  {
    title: 'Fourth Blog Post',
    content: 'This is the contents of the fourth blog post.',
    creator: 'Jane Smith',
    date: '2023-07-23',
  }
];

const seedBlogPosts = () => Blogs.bulkCreate(blogPostsData);

module.exports = seedBlogPosts;
