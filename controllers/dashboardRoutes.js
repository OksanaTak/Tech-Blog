const router = require('express').Router()
const { BlogPost, User, Comment } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      where:
        {
          userId: req.session.userId,
        }
    })

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map(blogPost =>
      blogPost.get({ plain: true })
    )

    // Pass serialized data and session flag into template
    res.render('all-blogposts-admin' )
  } catch (err) {
    res.redirect('login');
  }
})

router.get('/new', withAuth, (req, res) => {
  res.render('new-blogpost', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id);
   if (blogPostData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router
