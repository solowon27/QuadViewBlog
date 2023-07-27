const express = require('express');
const router = express.Router();
const { Blogs, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await Blogs.findAll();
    console.log(blogPosts);
    const blogs = blogPosts.map((blog) => blog.get({ plain: true }));
    console.log(blogs);
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
    const blogPost = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    res.render('blogpost', { 
      blog: blogPost.get({ plain: true }),
      loggedIn: req.session.loggedIn,
      username: req.session.username, 
      year: new Date().getFullYear(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to load blog post and comments.' });
  }
});


router.post('/blogs', async (req, res) => {
  try {
    await Blogs.create({
      title: req.body.title,
      content: req.body.content,
      creator: req.session.username, // Set the creator value
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create a new blog post. Please try again.');
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
