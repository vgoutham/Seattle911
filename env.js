'use strict';
const startingPoint =
module.exports = {
  port: process.env.PORT || 3000,
  mLabURI: '',
  db: 'mongodb://localhost/db',
  socrataURL: 'https://data.seattle.gov/resource/pu5n-trf4.json?$where=event_clearance_date%20between%20%222016-09-01T00:00:00%22%20and%20%222016-09-30T23:59:00%22'
};

// $select=date_trunc_ymd(date)%20as%20day%2C%20count(*)&$where=date%20%3E%20%222016-09-01%22
// 'https://data.seattle.gov/resource/pu5n-trf4.json?$where=event_clearance_date%3E%222016-09-01T00:00:00.000%22'

// ?$where=date between '2015-01-10T12:00:00' and '2015-01-10T14:00:00'
