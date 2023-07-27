const express = require('express');
const router = express.Router();
const { Comment, User, Blogs } = require('../models');

router.get('/blogs/:id/comments', async (req, res) => {
  try {
    const postId = req.params.id;
    // Query the database to get comments for the specified blog post
    const comments = await Comment.findAll({
      where: { blogId: postId },
      include: [{ model: User, attributes: ['username'] }],
    });

    // Respond with the comments in JSON format
    res.status(200).json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch comments.' });
  }
});

router.post('/blogs/:id/comments', async (req, res) => {
  try {
    // Extract the blog post ID from the request parameters
    const blogId = req.params.id;

    // Extract the comment text from the request body
    const { text } = req.body;

    // Create the new comment
    const newComment = await Comment.create({
      text, 
      blogId: blogId, // Set the blogId to the ID of the blog post
      user_id: req.session.user_id, // Set the user_id to the ID of the logged-in user
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create a new comment. Please try again.' });
  }
});

module.exports = router;
