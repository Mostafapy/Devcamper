require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const mongoDBConnectionHelper = require('./helpers/mongoDBConnection');
const readJsonFiles = require('./helpers/readJsonFiles');

const logger = require('./utils/logger')('Devcamper_Api:Seeder');
// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const BootcampModel = require('./models/Bootcamp');
const CourseModel = require('./models/Course');
const UserModel = require('./models/User');

// Connect MongoDB
mongoDBConnectionHelper().catch(err => {
   logger.error(
      '@mongoose.connect() failed connect to mongoDB [error: %s]'.red.underline
         .bold,
      err.message,
   );
   mongoose.connection
      .close()
      .then(() => {
         process.exit(1);
      })
      .catch(() => {
         process.exit(1);
      });
});

// Import into DB
const importData = async () => {
   try {
      // Read JSON data
      const bootcamps = await readJsonFiles(
         `${__dirname}/_data/bootcamps.json`,
      );

      const courses = await readJsonFiles(`${__dirname}/_data/courses.json`);

      const users = await readJsonFiles(`${__dirname}/_data/users.json`);

      await BootcampModel.create(bootcamps);

      await CourseModel.create(courses);

      await UserModel.create(users);

      logger.log('Data imported Successfully'.green.inverse);

      process.exit();
   } catch (err) {
      logger.error('importData() [error: %s]'.red.inverse, err.message);
   }
};

// Delete data from DB
const deleteData = async () => {
   try {
      await BootcampModel.deleteMany();
      await CourseModel.deleteMany();
      await UserModel.deleteMany();

      logger.log('Data destroyed Successfully'.green.inverse);

      process.exit();
   } catch (err) {
      logger.error('deleteData() [error: %s]'.red.inverse, err.message);
   }
};

// Import Action
if (process.argv[2] === '-i') {
   importData();
}

// Delete Action
if (process.argv[2] === '-d') {
   deleteData();
}
