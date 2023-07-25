const express = require('express');
const router = express.Router();
const { Blogs, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await Blogs.findAll();
    const blogs = blogPosts.map((blog) => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      year: new Date().getFullYear(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Get the logged-in user's ID from the session
    const userId = req.session.user_id;

    // If the user is not logged in, redirect to the login page
    if (!userId) {
      return res.redirect('/login');
    }

    // Find all blog posts belonging to the logged-in user
    const blogs = await Blogs.findAll({
      where: { user_id: userId }, // Use correct column name user_id
      include: [{ model: User, attributes: ['username'] }],
    });

    // Render the dashboard view with the user's blog posts
    res.render('dashboard', { loggedIn: true, username: req.session.username, blogs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to load dashboard.' });
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogPost = await Blogs.findByPk(req.params.id);
    const blog = blogPost.get({ plain: true });
    res.render('blogpost', {
      blog,
      logged_in: req.session.logged_in,
      year: new Date().getFullYear(),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blogPost = await Blogs.create({
      title: req.body.title,
      content: req.body.content,
      creator: req.session.username, // Set the creator value
    });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/blogs/:id', async (req, res) => {
  try {
    const blogPost = await Blogs.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const blogPost = await Blogs.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
