const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});
