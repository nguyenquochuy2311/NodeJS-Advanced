const kue = require('kue'), queue = kue.createQueue();

var job = queue.create('startdownload', {url: url}).save(function(error) {
    if (!error) console.log(job.id);
    else console.log(error);
});

queue.process( 'startdownload', 1, downloadImageJob);