const { Place } = require('./../../models/Place');
const { ObjectID } = require('mongodb');

const places = [
  {
    _id: new ObjectID(),
    name: 'example one',
    lng: 12323193129,
    lat: 123943992,
    type: 'restaurent'
  },
  {
    _id: new ObjectID(),
    name: 'example two',
    lng: 12323193129,
    lat: 123943912392,
    type: 'restaurent'
  }
];
//remove before each done method
const populatePlaces = done => {
  setTimeout(done, 0);

  Place.remove({})
    .then(() => {
      //for getting some data
      return Place.insertMany(places);
    })
    .then(() => done());
};
module.exports = { places, populatePlaces };
