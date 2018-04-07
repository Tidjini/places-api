const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');

const { Place } = require('./../models/Place');

//to seed some cheking data
const { places, populatePlaces } = require('./seed/seed');
//before each done populate places
beforeEach(populatePlaces);

describe('POST /api/places', () => {
  it('should create a new place', done => {
    setTimeout(done, 0);

    const place = {
      name: 'example test',
      lng: 12323129,
      lat: 123943992,
      type: 'restaurent'
    };

    //request from supertest : library for testing express app (handle test requesting to express application)
    request(app)
      .post('/api/places')
      .send(place)
      .expect(200)
      .expect(res => {
        //expect is simple library to do custom testing
        expect(res.body.name).toBe(place.name);
      })
      .end((err, res) => {
        if (err) return done(err);
        //get all todos to check if the todo is realy stored
        Place.find(place)
          .then(places => {
            //expecting that we added just one // NOTE: GOTO beforeEach if your already add data (init db to Collection)
            expect(places.length).toBe(1);
            //re-check the value
            expect(places[0].name).toBe(name);
            //call done method to out the result
            done();
          })
          .catch(err => done(err));
      });
  });
  it('should not create a place with invalid body request', done => {
    setTimeout(done, 0);

    request(app)
      .post('/api/places')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Place.find()
          .then(places => {
            //expecting that we added just one // NOTE: GOTO beforeEach if your already add data (init db to Collection)
            expect(places.length).toBe(2);
            //call done method to out the result
            done();
          })
          .catch(err => done(err));
      });
  });
  it('should not create a place with unique location', done => {
    setTimeout(done, 0);

    request(app)
      .post('/api/places')
      .send(places[0])
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Place.find()
          .then(places => {
            //expecting that we added just one // NOTE: GOTO beforeEach if your already add data (init db to Collection)
            expect(places.length).toBe(2);
            //call done method to out the result
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe('GET /api/places', () => {
  it('should get all places list', done => {
    setTimeout(done, 0);
    request(app)
      .get('/api/places')
      .expect(200)
      .expect(res => {
        expect(res.body.places.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /api/places/:id', () => {
  it('should get place ', done => {
    setTimeout(done, 0);
    request(app)
      .get(`/api/places/${places[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.place.name).toBe(places[0].name);
      })
      .end(done);
  });

  it('should not get place (not found)', done => {
    setTimeout(done, 0);
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/api/places/${id}`)
      .expect(404)
      .end(done);
  });

  it('should not get place (invalid id)', done => {
    //setTimeout(done, 0);
    const id = '5ac24acd7d636a3bf493f2b2zefzef';
    request(app)
      .get(`/api/places/${id}`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /api/places/:id', () => {
  it('should delete place', done => {
    setTimeout(done, 0);
    request(app)
      .delete(`/api/places/${places[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.place.name).toBe(places[0].name);
      })
      .end((err, res) => {
        if (err) return done(err);

        Place.findById(places[0]._id.toHexString())
          .then(place => {
            //expecting that we added just one // NOTE: GOTO beforeEach if your already add data (init db to Collection)
            expect(place).toNotExist();
            //call done method to out the result
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should not delete not found place', done => {
    setTimeout(done, 0);
    const id = new ObjectID().toHexString();
    request(app)
      .delete(`/api/places/${id}`)
      .expect(404)
      .end(done);
  });

  it('should not delete place with invalid id', done => {
    //setTimeout(done, TIME_OUT);
    const id = '5ac24acd7d636a3bf493f2b2zefzef';
    request(app)
      .delete(`/api/places/${id}`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /api/places/:id', () => {
  //this.timeout(10000);
  it('should update a place', done => {
    //init the time out
    //
    setTimeout(done, 0);
    const place = {
      name: 'text updated (item 1)',
      description: 'azebfhbahze'
    };
    //request from supertest : library for testing express app (handle test requesting to express application)
    request(app)
      .patch(`/api/places/${places[0]._id.toHexString()}`)
      .send(place)
      .expect(200)
      .expect(res => {
        //expect is simple library to do custom testing
        expect(res.body.place.name).toBe(place.name);
        expect(res.body.place.description).toBe(place.description);
      })
      .end(done);
  });
});
