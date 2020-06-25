const colors = require('colors')
const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');


//Load env vars
dotenv.config({ path: './config/config.env' });

// Model
const Bootcamp = require('./models/Bootcamp');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'UTF-8'));

// Import Data into database
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...'.green);
    process.exit();
  } catch (err) {
    console.log(err);
  }  
}

// Delete data from database
const deleteData = async () => {

  try {
    await Bootcamp.deleteMany();
  
    console.log('Data Destroyed...'.red);
    process.exit();
  } catch (err) {
    console.error(err);
  }  
}

if(process.argv[2] === '-i'){
  importData();
} else if(process.argv[2] === '-d'){
  deleteData();
}
