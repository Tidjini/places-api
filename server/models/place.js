const mongoose = require('mongoose');
const _ = require('lodash');

const PlaceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minlength: 1,
    trim: 1
  },
  location: {
    lat: {
      type: Number,
      minlength: 1,
      trim: 1
    },
    lng: {
      type: Number,
      minlength: 1,
      trim: 1
    }
  },
  name: {
    type: String,
    required: true,
    minlength: 6
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String
  },
  rate: {
    type: Number,
    default: 0
  }
});

PlaceSchema.index({ location: 1 }, { unique: true });

PlaceSchema.methods.toJSON = function() {
  const place = this;
  const placeObject = place.toObject();

  return _.pick(placeObject, [
    '_id',
    'name',
    'description',
    'rate',
    'type',
    'location'
  ]);
};

const Place = mongoose.model('Place', PlaceSchema);

module.exports = {
  Place
};
