'use strict';
const Socrata = require('./socrata_data.js');
const debug = require('debug')('seattle911:sort_data');
module.exports.superGroups = {
  'TRESPASS': 'PropertyCrimeTheft',
  'SHOPLIFTING': 'PropertyCrimeTheft',
  'DISTURBANCES': 'Miscellaneous',
  'BIKE': 'PropertyCrimeTheft',
  'OTHER PROPERTY': 'PropertyCrimeTheft',
  'CAR PROWL': 'PropertyCrimeTheft',
  'OTHER VICE': 'DrugAndVice',
  'AUTO THEFTS': 'PropertyCrimeTheft',
  'TRAFFIC RELATED CALLS': 'Transportation',
  'PERSON DOWN/INJURY': 'AssistingthePublic',
  'PROPERTY DAMAGE': 'PropertyCrimeTheft',
  'LIQUOR VIOLATIONS': 'DrugAndVice',
  'SUSPICIOUS CIRCUMSTANCES': 'Miscellaneous',
  'BEHAVIORAL HEALTH': 'Miscellaneous',
  'LEWD CONDUCT': 'DrugAndVice',
  'FRAUD CALLS': 'PropertyCrimeTheft',
  'ROBBERY': 'Crimes Against Persons',
  'ASSAULTS': 'Crimes Against Persons',
  'NUISANCE, MISCHIEF': 'Miscellaneous',
  'PROPERTY - MISSING, FOUND': 'PropertyCrimeTheft',
  'MISCELLANEOUS MISDEMEANORS': 'Miscellaneous',
  'THREATS, HARASSMENT': 'Crimes Against Persons',
  'PERSONS - LOST, FOUND, MISSING': 'AssistingthePublic',
  'BURGLARY': 'PropertyCrimeTheft',
  'MOTOR VEHICLE COLLISION INVESTIGATION': 'Transportation',
  'FALSE ALARMS': 'Miscellaneous',
  'ARREST': 'Miscellaneous',
  'WEAPONS CALLS': 'Miscellaneous',
  'PROSTITUTION': 'DrugAndVice',
  'HAZARDS': 'Miscellaneous',
  'NARCOTICS COMPLAINTS': 'DrugAndVice',
  'PROWLER': 'Miscellaneous',
  'ANIMAL COMPLAINTS': 'Miscellaneous',
  'RECKLESS BURNING': 'Miscellaneous',
  'HARBOR CALLS': 'Transportation',
  'PUBLIC GATHERINGS': 'Miscellaneous',
  'DRIVE BY (NO INJURY)': 'Crimes Against Persons',
  'HOMICIDE': 'Crimes Against Persons',
  'FAILURE TO REGISTER (SEX OFFENDER)': 'Miscellaneous',
  'FALSE ALACAD': 'Miscellaneous',
  'VICE CALLS': 'DrugAndVice'
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
    //addSuperGroup(parsedData, superGroups);
  });
}//end of getData
