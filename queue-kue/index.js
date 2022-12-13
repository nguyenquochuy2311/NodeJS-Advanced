var express = require('express');
var router = express.Router();
const queue = require('./workers/worker').queue;

/* GET home page. */
router.get('/', function(req, res, next) {
  var jobs = [];
  queue.active( function( err, ids ) {
    ids.forEach( function( id ) {
      console.log('id: ' + id);
      jobs.push({id: id});
    });
    res.render('index', { title: 'Kue' , jobs: jobs});
  });
});