// app.js
const express = require('express');
const bodyParser = require('body-parser');
const SDK = require('./sdk');;

const app = express();
const port = 4000;

app.use(bodyParser.json());
const sdk = new SDK();

app.post('/init', (req, res) => {
  try {
    sdk.init(req.body);
    res.send('SDK initialized successfully.');
  }
  catch (err) {
    res.send(err);
  }
});

app.get('/isSDKInitialized', (req, res) => {
  try {
    const isSDKInitialized = sdk.isSDKInitialized();
    res.json({ isSDKInitialized });
  }
  catch (err) {
    res.send(err);
  }
});

app.get('/metadata', async (req, res) => {
  try {
    const metadata = await sdk.getMetadata();
    res.json(metadata);
  }
  catch (err) {
    res.status(500).json({ err })
  }
});

app.get('/customers/:index', async (req, res) => {
  try {
    const customersArr = [];
    const index = req.params.index;
    const customers = await sdk.getCustomers(index);
    
    customers.on('data', (chunk) => {
      customersArr.push(chunk);
    })
    .on('error', (err) => {
      res.status(500).json(err);
    })
    .on('finish', () => {
      res.json(customersArr);
    })    
  }
  catch (err) {
    res.status(500).json({ err })
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
