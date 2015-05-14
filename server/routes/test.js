var express = require('express');
var router = express.Router();

var Task = require('../models/first.test.model.js');

/*
 todo: remove this Method.
 its not useful and created only for presentation.
 */
function fakeDataGenerate(){
    var i, task, titleArr, categoryArr;

    titleArr = ['Lesson', 'Do the homework', 'Gym', 'Buy food in Wallmart'];
    categoryArr = ['Education', 'Home', 'Health'];

    for(i = 0; i < 10; i++)
    {
        task = new Task({
            title: titleArr[i % 4],
            category: categoryArr[i % 3]
        });

        task.save(function(err){
            if(err) res.end('There is some problem with saving!!!');
        });
    }
};


/*
 todo: remove this Method.
 its not useful and created only for presentation.
 */
function fakeDataShow(res){
    Task.find({}, function(err, result) {
        res.json({tasks: result});
    });
};


/*
 todo: remove this Method.
 its not useful and created only for presentation.
 */
var counter = 0;
function fakeDataRemove(){
    counter++;
    if(counter == 3){
        Task.remove().exec();
        counter = 0;
    }
};


/*
 todo: remove three Methods in router.
 its not useful and created only for presentation.
 */
router.get('/', function(req, res, next) {
    fakeDataRemove();
    fakeDataGenerate();
    fakeDataShow(res);
});


module.exports = router;
