const express = require('express');
const mongoose = require('mongoose');
const Test = require('../models/test');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Handling GET requests at /test/"
    });
});

router.get('/:testId',(req,res,next)=>{
    const id = req.params.testId;
    Test.findById(id)
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });

});
router.post('/',(req,res,next)=>{
    const test = new Test({
        _id: mongoose.Types.ObjectId(),
        msg: req.body.msg 
    });

    test
    .save()
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    });

    res.status(201).json({
        message: 'Test was created',
        test: test
    });
});

module.exports = router;