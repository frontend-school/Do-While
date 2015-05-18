var express = require('express'),
    router = express.Router(),
    Project = require('../../models/project.model');

// This route for getting project data to the client
router.get('/', function(req, res) {

    Project.find({}, function(err, result) {
        if(!err){
            res.json({items: result});
        }
        console.log('There is some problems with getting data from DB!!!'.toUpperCase());
    });

});

// This route for getting project data from client and saving them to DB
router.post('/add', function(req, res){

    var newProject = Project({
        name: req.body.name,
        color: req.body.color,
        taskCount: Math.floor((Math.random() * 10) + 1)    // This is for demo (random task count)
    });

    newProject.save(function(err){
        if(err){
            console.log('There is some problem with saving data to DB!!!'.toUpperCase());
        }
    });
});

module.exports = router;