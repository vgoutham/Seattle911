'use strict';
const expect = require('chai').expect;
const nock = require('nock');
const getSocrataData = require('../app/controller/request_incidentPoints').getSocrataData;
const debug = require('debug')('seattle911:index.spec');
const request = require('request');

describe('should GET geojson formatted data', ()=>{
  debug('hitting describe');
  before(()=>{
    debug('hitting beforeEach');
    let socrataData = {"login": "mylogin"};
    nock('https://data.seattle.gov')
    .get('/resource/pu5n-trf4.geojson?$where=event_clearance_date%20between%20"2016-09-01T00:01:33Z"%20and%20"2016-09-02T00:01:33Z"')
    .reply(200, socrataData);
  });

  it('returns function', (done)=>{
    debug('hitting it block');
    let startDate = '2016-09-01T00:01:33Z';
    let endDate = '2016-09-02T00:01:33Z';
    debug(getSocrataData);
    getSocrataData(startDate, endDate, (err, res)=>{
      debug(res);
    });
  });
});//end of describe
