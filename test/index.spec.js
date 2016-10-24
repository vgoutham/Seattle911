'use strict';
const expect = require('chai').expect;
const nock = require('nock');
const Promise = require('bluebird');
const getSocrataData = require('../app/controller/request_incidentPoints').getSocrataData;

const debug = require('debug')('seattle911:index.spec');
const request = require('request');

describe('should GET geojson formatted data', ()=>{
  beforeEach((done)=>{
    debug('hitting describe');
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
    this.test = nock('https://data.seattle.gov')
    .log(console.log)
    .filteringPath((path)=>{
      return '/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-09-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"';
    })
    .get('/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-09-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"')
    .reply(200, socrataData);
    debug(this.test);
    done();
  });

  it('should return geojson format data', (done)=>{
    debug('hitting it block');
    let startDate = '2016-09-01T00:01:33Z';
    let endDate = '2016-09-02T00:01:33Z';
    getSocrataData(startDate, endDate, (res)=>{
      debug('in getSocrataData');
      debug(res);
      expect(res).to.be.an('Object');
      expect(res).to.have.property('type');
      expect(res.features).to.have.lengthOf(3);
      res.features.forEach((obj)=>{
        expect(obj).to.have.property('properties');
        expect(obj).to.have.property('geometry');
        expect(obj.geometry.type).to.equal('Point');
        expect(obj.geometry.coordinates).to.be.an('Array');
      });
      done();
    });
  });//end of it block
});//end of describe
