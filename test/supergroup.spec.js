'use strict';
const expect = require('chai').expect;
const assert = require('chai').assert;
const addSuperGroupFn = require('../app/controller/incident_points_ctrl').addSuperGroup;
const _ = require('lodash');
const debug = require('debug')('seattle911:supergroup.spec');

describe('addSuperGroup function', () => {
  let originalResObj;
  let newObject;
  let obj;
  before((done) => {
    originalResObj = {
     "type": "FeatureCollection",
     "features": [
       {
         "type": "Feature",
         "properties": {
           cad_event_number: 'hahahaid12',
           event_clearance_group: 'OTHER PROPERTY'
         },
         "geometry": {
           "type": "Point",
           "coordinates": [
             88.59374999999999,
             38.8225909761771
           ]
         }
       }]
     };
     done();
  });
  afterEach((done) => {
    obj = _.update(originalResObj, 'features[0].properties.event_clearance_group', (hasSuperGroup) => { return '' ;});
    originalResObj = _.update(obj, 'features[0].properties.event_super_group', (goodAsNew) => { return undefined ;});
    done();
  });

  it('should return object with an added properties of event_super_group and _id with cad_event_number', (done) => {
    debug('it block');
    newObject = addSuperGroupFn(originalResObj);
    expect(newObject).to.be.instanceOf(Array);
    expect(newObject[0].geometry.coordinates).to.be.instanceOf(Array);
    expect(newObject[0]).to.have.property('_id');
    expect(newObject[0]._id).to.have.string('hahahaid12');
    expect(newObject[0].properties).to.have.property('event_super_group');
    expect(newObject[0].properties.event_super_group).to.eql('PROPERTY');
    done();
  });

  it('should throw an error when event_super_group is undefined', (done) => {
    expect(function(){addSuperGroupFn(originalResObj);}).to.throw(Error);
    done();
  });

  it('should throw an error when event_super_group is null', (done) => {
    originalResObj = _.update(obj, 'features[0].properties.event_super_group', (goodAsNew) => { return null ;});
    expect(function(){addSuperGroupFn(originalResObj);}).to.throw(Error);
    done();
  });
});//end of describe
