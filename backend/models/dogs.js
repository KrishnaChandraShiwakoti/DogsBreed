const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The dog must be of a breed, so what is it'],
  },
  description: {
    type: String,
    required: [true, 'Give some details about this dog'],
  },
  life: {
    max: { type: Number, required: [true, 'Life expectancy max is required'] },
    min: { type: Number, required: [true, 'Life expectancy min is required'] },
  },
  male_weight: {
    max: { type: Number, required: [true, 'Male weight max is required'] },
    min: { type: Number, required: [true, 'Male weight min is required'] },
  },
  female_weight: {
    max: { type: Number, required: [true, 'Female weight max is required'] },
    min: { type: Number, required: [true, 'Female weight min is required'] },
  },
  hypoallergenic: {
    type: Boolean,
    required: [true, 'Well, is it hypoallergenic or not?'],
  },
});

dogSchema.pre(/^find/, function (next) {
  this.select('-__v -hypoallergenic'), next();
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
