const router = require('express').Router()
const { BlogPost, User, Comment } = require('../models')
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log('try at  1')
    // Get all projects and JOIN with user data
    const blogPostData = await BlogPost.findAll({
      include: [User]
    })

    console.log('try at  2')

    // Serialize data so the template can read it
    const blogPosts = blogPostData.map(blogPost =>
      blogPost.get({ plain: true })
    )

    // Pass serialized data and session flag into template
    res.render('all-blogposts', {
      blogPosts
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          attributes: [User]
        }
      ]
    })

    const blogPost = blogPostData.get({ plain: true })

    res.render('single-blogpost', {
      ...blogPost
    })
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log('try at  login')
  if (req.session.logged_in) {
    res.redirect('/')
    return
  }

  res.render('login')
})

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.signed_up) {
    res.redirect('/')
    return
  }

  res.render('signup')
})

module.exports = router
