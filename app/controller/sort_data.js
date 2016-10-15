'use strict';
const Socrata = require('./socrata_data.js');
const debug = require('debug')('seattle911:sort_data');
const IncidentPointCtr = require('./incident_points_ctrl');
const superGroups = {
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

function sortCountData (){
  debug('sortData');
  Socrata.getDataSet()
  .then((dataArr)=>{
    let cityCrime = {};
    let parseddataArr = JSON.parse(dataArr);
      parseddataArr.map((data)=>{
        debug('hitting parseddataArr.map');
        if(!cityCrime[data.event_clearance_group]){
          cityCrime[data.event_clearance_group]['count'] = cityCrime[data.event_clearance_group] || 0;
          cityCrime[data.event_clearance_group] ++;
        } else {
          cityCrime[data.event_clearance_group] ++;
        }
      });
  }).catch((err)=>{
    console.error(err);
  });
}

function getData (){
  Socrata.getDataSet()
  .then((data)=>{
    let parsedData = JSON.parse(data);
    IncidentPointCtr.addSuperGroup(parsedData, superGroups);
  });
}//end of getData

getData();
