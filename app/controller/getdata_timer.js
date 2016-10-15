'use strict';
const CronJob = require('cron').CronJob;
let job = new CronJob({
  cronTime: '00 00 10 * * 1-7',
  onTick: function(){
    // TODO: call getData here
  },
  start: false,
  timeZone: 'America/Seattle'
});

job.start();
