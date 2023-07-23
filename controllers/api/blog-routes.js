const express = require('express');
const router = express.Router();
const { Blogs } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const blogPosts = await Blogs.findAll();
    res.render('homepage', { blogPosts, year: new Date().getFullYear() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    const blogPosts = await Blogs.findAll({
      where: { user_id: req.session.user_id }
    });
    res.render('dashboard', { blogPosts, year: new Date().getFullYear() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogPost = await Blogs.findByPk(req.params.id);
    res.render('blogs', { blogPost, year: new Date().getFullYear() });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/blogs', async (req, res) => {
  try {
    const newBlogPost = await Blogs.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    const blogPostData = await Blogs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
