const Story = require('../models/storyModel');
const mongoose = require('mongoose');

// Get all stories

const getAllStories = async (req, res) => {
  const storys = await Story.find({}).sort({ createdAt: -1 });
  res.status(200).json(storys);
};

// Get a story

const getSingleStory = async (req, res) => {
  const { id } = req.params;

  // check if id exists
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Story' });
  }

  const story = await Story.findById(id);
  if (!story) {
    return res.status(404).json({ error: 'No such Story' });
  }

  res.status(200).json(story);
};

// Create a story

const createStory = async (req, res) => {
  const { name, email, userStory } = req.body;

  try {
    const story = await Story.create({ name, email, userStory });
    res.status(200).json(story);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a story

const deleteStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Story' });
  }

  const story = await Story.findOneAndDelete({ _id: id });

  if (!story) {
    return res.status(400).json({ error: 'No such Story' });
  }

  res.status(200).json(story);
};

// Update a story

const updateStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Story' });
  }

  const story = await Story.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!story) {
    return res.status(400).json({ error: 'No such Story' });
  }

  res.status(200).json(story);
};

module.exports = {
  createStory,
  getAllStories,
  getSingleStory,
  deleteStory,
  updateStory,
};
