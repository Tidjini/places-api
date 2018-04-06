const { Place } = require('../models/Place');
const _ = require('lodash');

module.exports = app => {
  //POST /api/places
  app.post('/api/places', (req, res) => {
    const body = _.pick(req.body, [
      'type',
      'lat',
      'lng',
      'name',
      'description'
    ]);
    const place = new Place({
      type: body.type,
      location: {
        lat: body.lat,
        lng: body.lng
      },
      name: body.name,
      description: body.description
    });

    place.save().then(
      doc => {
        res.send(doc);
      },
      err => {
        res.status(400).send(err);
      }
    );
  });
};
