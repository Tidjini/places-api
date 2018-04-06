const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');

const placesRoutes = require('./routers/places');
const app = new express();
//convert result to json (Body parser as middleware)
app.use(bodyParser.json());

placesRoutes(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Started on Port', PORT);
});

// module.exports = {
//   app
// };
