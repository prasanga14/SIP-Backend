const express = require('express');
const {
  createStory,
  getAllStories,
  getSingleStory,
  deleteStory,
  updateStory,
} = require('../controllers/storyController');

const router = express.Router();

router.get('/', getAllStories);

router.get('/:id', getSingleStory);

router.post('/', createStory);

router.delete('/:id', deleteStory);

router.patch('/:id', updateStory);

module.exports = router;
