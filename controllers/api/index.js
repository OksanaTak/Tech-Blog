const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

const blogpostRoutes = require('./blogpostRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);

router.use('/blogposts', blogpostRoutes);

module.exports = router;
