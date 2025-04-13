const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticateToken = require('../middleware/authMiddleware');

// GET all tasks
router.get('/', authenticateToken, async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// POST create a task
router.post('/', async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
});

// PUT update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Task.update(req.body, { where: { id } });
  res.sendStatus(204);
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.sendStatus(204);
});

module.exports = router;
