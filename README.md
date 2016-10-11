# Seattle 911 Alert

This is project to map Seattle police 911 responses

https://data.seattle.gov/resource/pu5n-trf4.json?$where=event_clearance_date%3E%222016-10-02T00:28:00.000%22

1. npm install
2. Create db directory in your root file.
3. run both server and hit localhost:3000/fetchdata to store data in db
4. hit get '/' route to get all the stored data.

{"at_scene_time":"2016-10-02T02:28:18.000","cad_cdw_id":"1846446","cad_event_number":"16000356905","census_tract":"9200.2023","district_sector":"K","event_clearance_code":"010","event_clearance_date":"2016-10-02T05:22:54.000","event_clearance_description":"HOMICIDE","event_clearance_group":"HOMICIDE","event_clearance_subgroup":"HOMICIDE","general_offense_number":"2016356905","hundred_block_location":"OCCIDENTAL AV S / S WASHINGTON ST","incident_location":{"type":"Point","coordinates":[-122.33288,47.60088]},"initial_type_description":"ASLT - IP/JO - PERSON SHOT OR SHOT AT","initial_type_group":"GUN CALLS","initial_type_subgroup":"ASSAULTS","latitude":"47.60088","longitude":"-122.33288","zone_beat":"K2"}

{ TRESPASS: 9440,
  SHOPLIFTING: 7796,
  DISTURBANCES: 35598,
  BIKE: 850,
  'OTHER PROPERTY': 6536,
  'CAR PROWL': 9636,
  'OTHER VICE': 51,
  'AUTO THEFTS': 5316,
  'TRAFFIC RELATED CALLS': 44898,
  'PERSON DOWN/INJURY': 1535,
  'PROPERTY DAMAGE': 4038,
  'LIQUOR VIOLATIONS': 13238,
  'SUSPICIOUS CIRCUMSTANCES': 35393,
  **'BEHAVIORAL HEALTH': 5436,**
  'LEWD CONDUCT': 724,
  'FRAUD CALLS': 3042,
  ROBBERY: 'Crimes Against Persons',
  ASSAULTS: 'Crimes Against Persons',
  'NUISANCE, MISCHIEF': 8424,
  'PROPERTY - MISSING, FOUND': 3322,
  'MISCELLANEOUS MISDEMEANORS': 1279,
  'THREATS, HARASSMENT': 'Crimes Against Persons',
  'PERSONS - LOST, FOUND, MISSING': 1165,
  BURGLARY: 7570,
  'MOTOR VEHICLE COLLISION INVESTIGATION': 18353,
  'FALSE ALARMS': 1132,
  ARREST: 1458,
  'WEAPONS CALLS': 631,
  PROSTITUTION: 441,
  HAZARDS: 3970,
  'NARCOTICS COMPLAINTS': 4436,
  PROWLER: 388,
  'ANIMAL COMPLAINTS': 645,
  'RECKLESS BURNING': 42,
  'HARBOR CALLS': 273,
  'PUBLIC GATHERINGS': 115,
  'DRIVE BY (NO INJURY)': 'Crimes Against Persons',
  HOMICIDE: 'Crimes Against Persons',
  'FAILURE TO REGISTER (SEX OFFENDER)': 38,
  'FALSE ALACAD': 10850,
  'VICE CALLS': 2 }

  {
    CrimesAgainstPersons: ["ASSAULTS","THREATS, HARASSMENT","DRIVE BY (NO INJURY)","HOMICIDE","ROBBERY"],
    AssistingthePublic: ["PERSON DOWN/INJURY","PERSONS - LOST, FOUND, MISSING"],
    DrugAndVice: ["OTHER VICE", "LIQUOR VIOLATIONS","LEWD CONDUCT","PROSTITUTION","NARCOTICS COMPLAINTS","VICE CALLS"],
    PropertyCrimeTheft: ["TRESPASS", "SHOPLIFTING", "BIKE", "OTHER PROPERTY","CAR PROWL","AUTO THEFTS","PROPERTY DAMAGE","FRAUD CALLS","PROPERTY - MISSING, FOUND","BURGLARY"],
    Transportation: ["TRAFFIC RELATED CALLS","MOTOR VEHICLE COLLISION INVESTIGATION","HARBOR CALLS"],
    Miscellaneous: ["DISTURBANCES","SUSPICIOUS CIRCUMSTANCES","NUISANCE, MISCHIEF","MISCELLANEOUS MISDEMEANORS","FALSE ALARMS","ARREST","WEAPONS CALLS","HAZARDS","PROWLER","ANIMAL COMPLAINTS","RECKLESS BURNING","PUBLIC GATHERINGS","FAILURE TO REGISTER (SEX OFFENDER)","FALSE ALACAD","BEHAVIORAL HEALTH"],
  }
