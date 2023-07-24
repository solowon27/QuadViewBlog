// blog-routes.js
const express = require('express');
const router = express.Router();
const { Blogs } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await Blogs.findAll();
  const blogs = blogPosts.map((blog) => blog.get({ plain: true }));
  res.render('homepage', { blogs, 
    logged_in: req.session.logged_in,
    year: new Date().getFullYear() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const blogPosts = await Blogs.findAll();
    const blogs = blogPosts.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', { blogs, 
      logged_in: req.session.logged_in,
      year: new Date().getFullYear() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogPost = await Blogs.findByPk(req.params.id);
    const blog = blogPost.get({ plain: true });
    res.render('blogpost', { blog, 
      logged_in: req.session.logged_in,
      year: new Date().getFullYear() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const blogPost = await Blogs.create({
      ...req.body,
      user_id: req.session.user_id,
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