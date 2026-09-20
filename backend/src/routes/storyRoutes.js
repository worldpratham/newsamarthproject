const express = require('express');
const router = express.Router();
const { getStories, getStoryById } = require('../controllers/storyController');

router.get('/', getStories);
router.get('/:id', getStoryById);

module.exports = router;
