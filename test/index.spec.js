'use strict';
const expect = require('chai').expect;
const nock = require('nock');
const Promise = require('bluebird');
const getSocrataData = require('../app/controller/request_incidentPoints').getSocrataData;
const debug = require('debug')('seattle911:index.spec');
const request = require('request');

describe('should GET geojson formatted data', ()=>{
  before((done)=>{
    debug('hitting describe');
    this.startDate = '2016-09-01T00:01:33Z';
    this.endDate = '2016-09-02T00:01:33Z';
    let socrataData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            88.59374999999999,
            38.8225909761771
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            95.625,
            51.6180165487737
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            237.66740798950192,
            47.607088939995585
          ]
        }
      }
    ]
  };
  //nock mocking for success
    nock('https://data.seattle.gov')
    .log(console.log)
    .filteringPath((path)=>{
      return '/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-09-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"';
    })
    .get('/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-09-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"')
    .reply(200, socrataData);

    //nock mocking for error
    nock('https://data.seattle.gov')
    .log(console.log)
    .filteringPath((path)=>{
      return '/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-99-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"';
    })
    .get('/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-99-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"')
    .replyWithError({statusCode: 404, message: 'error, page not found'});

    done();
  });//end of before block

  it('should return geojson format data', (done)=>{
    debug('hitting it block');
    getSocrataData(this.startDate, this.endDate)
    .then((res)=>{
      debug('in getSocrataData');
      expect(res.status).to.equal(200);
      expect(res.data).to.be.an('Object');
      expect(res.data).to.have.property('type');
      expect(res.data.features).to.have.lengthOf(3);
      res.data.features.forEach((obj)=>{
        expect(obj).to.have.property('properties');
        expect(obj).to.have.property('geometry');
        expect(obj.geometry.type).to.equal('Point');
        expect(obj.geometry.coordinates).to.be.an('Array');
      });
      done();
    });
  });//end of it block

  it('should error', (done)=>{
    debug('hitting it block - error');
    let startD = '2016-99-01T00:01:33Z';
    getSocrataData(startD, this.endDate)
    .then((res)=>{
      debug('response should not come back');
      done();
    })
    .catch((err)=>{
      debug('erorr');
      expect(err).to.be.an('Object');
      expect(err.statusCode).to.equal(404);
      expect(err).to.have.property('message');
      expect(err.message).to.equal('error, page not found');
      done();
    });
  });
});//end of describe
