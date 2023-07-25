const { Blogs } = require('../models');

const blogPostsData = [
  {
    title: 'The Benefits of Regular Exercise',
    content: 'Regular exercise has numerous benefits for both physical and mental health. It can help improve cardiovascular health, build muscle strength, and boost the immune system. Exercise also releases endorphins, which are natural mood elevators that can reduce stress and anxiety. Additionally, engaging in physical activity regularly can improve sleep quality and overall well-being. It is essential to find an exercise routine that suits your interests and fitness level to maintain consistency.',
    creator: 'FitnessEnthusiast123',
    date: '2023-07-20',
  },
  {
    title: 'Exploring the Wonders of Nature',
    content: 'Nature has a unique way of captivating our senses and inspiring awe and wonder. Whether it\'s hiking through lush forests, gazing at majestic mountains, or listening to the soothing sound of ocean waves, spending time in nature can be a transformative experience. Research has shown that being in nature can reduce stress levels, improve mood, and enhance creativity. It also provides an opportunity to disconnect from technology and connect with the natural world. Exploring nature is not only beneficial for our well-being but also helps foster a sense of environmental stewardship.',
    creator: 'NatureExplorer27',
    date: '2023-07-21',
  },
  {
    title: 'A Guide to Mindful Meditation',
    content: 'Mindful meditation is a practice that involves bringing awareness to the present moment without judgment. It can be done through focused breathing, body scans, or walking meditations. Mindful meditation has been shown to reduce anxiety, improve concentration, and promote emotional well-being. By practicing mindfulness, individuals can develop a greater sense of self-awareness and cultivate a more positive outlook on life. Incorporating mindful meditation into daily routines can lead to a more balanced and fulfilling life.',
    creator: 'MindfulnessMaven',
    date: '2023-07-22',
  },
  {
    title: 'The Art of Culinary Creativity',
    content: 'Cooking is not just a necessity; it is an art form that allows for endless creativity in the kitchen. From experimenting with new flavors and ingredients to presenting dishes in visually appealing ways, culinary creativity knows no bounds. Trying out different cuisines and cooking techniques can open up a world of culinary delights. Cooking for others can also be a way to express love and share joy. Embracing culinary creativity can turn meal preparation into a delightful and satisfying experience.',
    creator: 'ChefExtraordinaire',
    date: '2023-07-23',
  }
];

const seedBlogPosts = () => Blogs.bulkCreate(blogPostsData);

module.exports = seedBlogPosts;
