const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      blogId: req.body.blogId,
      userId: req.session.userId, // Assuming you have stored the logged-in user's ID in the session
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to submit the comment.' });
  }
});

module.exports = router;