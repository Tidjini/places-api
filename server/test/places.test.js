const expect = require('expect');
const request = require('supertest');
const { app } = require('../server');

const { Place } = require('./../models/Place');

//to seed some cheking data
const { places, populatePlaces } = require('./seed/seed');
//before each done populate places
beforeEach(populatePlaces);

describe('POST /api/places', () => {
  it('should create a new place', done => {
    //setTimeout(done, 0);

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

  // it('should not create a place with invalid body request', done => {
  //   request(app)
  //     .post('/api/places')
  //     .send({})
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //
  //       Place.find()
  //         .then(places => {
  //           //expecting that we added just one // NOTE: GOTO beforeEach if your already add data (init db to Collection)
  //           expect(places.length).toBe(2);
  //           //call done method to out the result
  //           done();
  //         })
  //         .catch(err => done(err));
  //     });
  // });

  // it('should not create a place with unique location', done => {
  //   request(app)
  //     .post('/api/places')
  //     .send(places[0])
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //
  //       Place.find()
  //         .then(places => {
  //           //expecting that we added just one // NOTE: GOTO beforeEach if your already add data (init db to Collection)
  //           expect(places.length).toBe(2);
  //           //call done method to out the result
  //           done();
  //         })
  //         .catch(err => done(err));
  //     });
  // });
});
