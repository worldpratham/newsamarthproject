const express = require('express');
const router = express.Router();
const { getPosts, getPostBySlug } = require('../controllers/postController');

router.route('/').get(getPosts);
router.route('/:slug').get(getPostBySlug);

module.exports = router;
