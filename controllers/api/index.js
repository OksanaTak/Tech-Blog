const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

const blogRoutes = require('./blogRoutes.js');

router.use('/user', userRoutes);
router.use('/comment', commentRoutes);

router.use('/blogposts', blogRoutes);

module.exports = router;
