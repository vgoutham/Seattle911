'use strict';
const IncidentPoint = require('../model/incident_point');
const debug = require('debug')('seattle911:incident_points_ctrl');
const _= require('lodash');
let option;
let newSetOfData = [];
const supergroupProp = {
  'TRESPASS': 'PROPERTY',
  'SHOPLIFTING': 'PROPERTY',
  'DISTURBANCES': 'MISC',
  'BIKE': 'PROPERTY',
  'OTHER PROPERTY': 'PROPERTY',
  'CAR PROWL': 'PROPERTY',
  'OTHER VICE': 'VICE',
  'AUTO THEFTS': 'PROPERTY',
  'TRAFFIC RELATED CALLS': 'VEHICLE',
  'PERSON DOWN/INJURY': 'ASSIST',
  'PROPERTY DAMAGE': 'PROPERTY',
  'LIQUOR VIOLATIONS': 'VICE',
  'SUSPICIOUS CIRCUMSTANCES': 'MISC',
  'BEHAVIORAL HEALTH': 'MISC',
  'LEWD CONDUCT': 'VICE',
  'FRAUD CALLS': 'PROPERTY',
  'ROBBERY': 'VIOLENT',
  'ASSAULTS': 'VIOLENT',
  'NUISANCE, MISCHIEF': 'MISC',
  'PROPERTY - MISSING, FOUND': 'PROPERTY',
  'MISC MISDEMEANORS': 'MISC',
  'THREATS, HARASSMENT': 'VIOLENT',
  'PERSONS - LOST, FOUND, MISSING': 'ASSIST',
  'BURGLARY': 'PROPERTY',
  'MOTOR VEHICLE COLLISION INVESTIGATION': 'VEHICLE',
  'FALSE ALARMS': 'MISC',
  'ARREST': 'MISC',
  'WEAPONS CALLS': 'MISC',
  'PROSTITUTION': 'VICE',
  'HAZARDS': 'MISC',
  'NARCOTICS COMPLAINTS': 'VICE',
  'PROWLER': 'MISC',
  'ANIMAL COMPLAINTS': 'MISC',
  'RECKLESS BURNING': 'MISC',
  'HARBOR CALLS': 'VEHICLE',
  'PUBLIC GATHERINGS': 'MISC',
  'DRIVE BY (NO INJURY)': 'VIOLENT',
  'HOMICIDE': 'VIOLENT',
  'FAILURE TO REGISTER (SEX OFFENDER)': 'MISC',
  'FALSE ALACAD': 'MISC',
  'VICE CALLS': 'VICE'
};


//upsertingng data
module.exports.storeIncidentPoints = (arr)=>{
  debug('storeIncidentPoints');
  arr.forEach((data)=>{
    let Point = new IncidentPoint(data);
    debug('about to be saved in db, but has pre hook in ./model.incident_point.js');
    debug(Point);
    Point.save();
  });
};//end of storeIncidentPoints fn


//adding event_super_group
module.exports.addSuperGroup = (res)=>{
  debug('addSuperGroup');
    let incidents = _.map(res.features, function(incident) {
      return _.merge(incident,
        { _id: incident.properties.cad_event_number,
          properties: {event_super_group: supergroupProp[incident.properties.event_clearance_group]}
        });
      });
      return incidents;
}; //end of addSuperGroup fn
