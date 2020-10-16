/* eslint-disable prefer-arrow-callback */
require('colors');
const mongoose = require('mongoose');

const logger = require('../utils/logger')('Models:Course');

const getAverageCostOfCourse = require('../helpers/getAverageCostOfCourse');

const CourseSchema = new mongoose.Schema({
   title: {
      type: String,
      trim: true,
      required: [true, 'Please add a course title'],
   },
   description: {
      type: String,
      required: [true, 'Please add a course discription'],
   },
   weeks: {
      type: String,
      required: [true, 'Please add number of weeks'],
   },
   tuition: {
      type: Number,
      required: [true, 'Please add a course tuition cost'],
   },
   minimumSkill: {
      type: String,
      required: [true, 'Please add minimun skills required for hte course'],
      enum: ['beginner', 'intermediate', 'advanced'],
   },
   scholarshipAvailable: {
      type: Boolean,
      default: false,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   bootcamp: {
      type: mongoose.Schema.ObjectId,
      ref: 'Bootcamp',
   },
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
   },
});

// Static method to get avg of tuitions
// eslint-disable-next-line func-names
CourseSchema.statics.getAverageCost = async function(bootcampId) {
   const obj = await getAverageCostOfCourse(bootcampId);
   try {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
         averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
      });
   } catch (err) {
      logger.error('@getAverageCost() [error: %s]'.red, err.message);
   }
};
// Call getAverageCost after save
// eslint-disable-next-line func-names
CourseSchema.post('save', function() {
   this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
// eslint-disable-next-line func-names
CourseSchema.post('save', function() {
   this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);
