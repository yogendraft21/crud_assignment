const fs = require('fs');
const csvParser = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

require('dotenv').config()
const csvFilePath = process.env.NODE_ENV === 'test' ? './testData.csv' : './data.csv';


async function readData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function writeData(data) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Data is empty or not an array.');
  }

  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    append: false,
  });

  try {
    await csvWriter.writeRecords(data);
  } catch (error) {
    console.log(error)
  }
}

async function findAll() {
  return await readData();
}

async function findById(id) {
  const data = await readData();
  return data.find((item) => parseInt(item.id) === id);
}

async function create(newRecord) {
  const data = await readData();
  let nid = parseInt(data[data.length - 1].id)
  const nextId = data.length > 0 ? nid + 1 : 1;
  const record = { id: nextId, ...newRecord };
  data.push(record);
  await writeData(data);
  return record;
}

async function update(id, updatedRecord) {
  const data = await readData();
  const index = data.findIndex((item) => parseInt(item.id) === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedRecord };
    await writeData(data);
    return data[index];
  }
  return null;
}

async function remove(id) {
  const data = await readData();
  const index = data.findIndex((item) => parseInt(item.id) === id);
  if (index !== -1) {
    const removedRecord = data.splice(index, 1)[0];
    await writeData(data);
    return removedRecord;
  }
  throw new Error('Record not found');
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
