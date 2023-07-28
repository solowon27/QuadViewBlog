const express = require('express');
const router = express.Router();
const { Blogs, User, Comment } = require('../models');

router.get('/', async (req, res) => { //get all blogs and render homepage
  try {
    const blogPosts = await Blogs.findAll();
    console.log(blogPosts);
    const blogs = blogPosts.map((blog) => blog.get({ plain: true })); //serialize data so template can read it
    //console.log(blogs);
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in, //pass logged_in session variable to template
      year: new Date().getFullYear(), //pass current year to template 
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

router.get('/blogs/:id', async (req, res) => { //get blog by id and render blogpost page
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
      blog: blogPost.get({ plain: true }), //serialize data so template can read it
      loggedIn: req.session.loggedIn, //pass logged_in session variable to template
      username: req.session.username,  //pass username session variable to template
      year: new Date().getFullYear(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to load blog post and comments.' });
  }
});


router.post('/blogs', async (req, res) => { //create new blog post
  try {
    await Blogs.create({
      title: req.body.title, // Set the title value
      content: req.body.content, // Set the content value
      creator: req.session.username, // Set the creator value
    });
    res.redirect('/dashboard'); // Redirect to the dashboard page if successful
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to create a new blog post. Please try again.');
  }
});


router.put('/blogs/:id', async (req, res) => { //update blog post by id
  try {
    const blogPost = await Blogs.update(req.body, { // Update the blog post
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(blogPost); // Respond with the updated blog post
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/blogs/:id', async (req, res) => { //delete blog post by id
  try {
    const blogPost = await Blogs.destroy({ // Delete the blog post
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
