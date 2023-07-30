const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const allData = await dataController.findAll();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/data/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // console.log(id)
    const record = await dataController.findById(id);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/data', async (req, res) => {
  try {
    const newRecord = req.body;
    // console.log(newRecord)
    const record = await dataController.create(newRecord);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/data/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedRecord = req.body;
    const record = await dataController.update(id, updatedRecord);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/data/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const record = await dataController.remove(id);
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
