const { Place } = require("../models/Place");
const { ObjectID } = require("mongodb");

const _ = require("lodash");

module.exports = app => {
  //POST /api/places
  app.post("/api/places", (req, res) => {
    const body = _.pick(req.body, [
      "type",
      "lat",
      "lng",
      "name",
      "description"
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

  //GET /api/places
  app.get("/api/places", (req, res) => {
    Place.find().then(
      places => {
        res.send({ places });
      },
      err => {
        res.status(400).send(err);
      }
    );
  });

  //GET /api/places/:id
  app.get("/api/places/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Place.findOne({ _id: id }).then(
      place => {
        if (place == null) return res.status(404).send("TODO not found");
        res.send({ place });
      },
      err => {
        res.status(400).send();
      }
    );
  });
  //DELETE /api/places/:id
  app.delete("/api/places/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    Place.findOneAndRemove({ _id: id }).then(
      place => {
        if (place == null) return res.status(404).send("TODO not found");
        res.send({ place });
      },
      err => {
        res.status(400).send();
      }
    );
  });
  //PATCH /api/places/:id
  app.patch("/api/places/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    const body = _.pick(req.body, [
      "type",
      "lat",
      "lng",
      "name",
      "description"
    ]);

    Place.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
      .then(place => {
        if (place == null) return res.status(404).send("TODO not found");
        res.send({ place });
      })
      .catch(err => {
        res.status(400).send();
      });
  });
};
