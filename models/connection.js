const mongoose = require('mongoose');
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const connectionString = `mongodb+srv://${CONNECTION_STRING}@cluster0.6dvqohn.mongodb.net/actorproject`;

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
