const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.post('/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      blogId: req.body.blogs_id,
      userId: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to submit the comment.' });
  }
});

module.exports = router;