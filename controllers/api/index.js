const router = require('express').Router();
const blogRoutes = require('./blog-routes');

router.use('/blogs', blogRoutes);

module.exports = router;
