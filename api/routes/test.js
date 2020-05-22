const express = require('express');
const mongoose = require('mongoose');
const Test = require('../models/test');

const router = express.Router();

// GET ReqHandler at /
router.get('/',(req,res,next)=>{
    Test.find()
    .select('_id msg')
    .exec()
    .then(docs=>{
        console.log(docs);
        const response = {
            count: docs.length,
            tests: docs.map(docs=>{
                return {
                    _id: docs._id,
                    msg: docs.msg,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/test/'+docs._id
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
});

// GET Handler at /:testId 
router.get('/:testId',(req,res,next)=>{
    const id = req.params.testId;
    Test.findById(id)
    .select('_id msg')
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

// POST ReqHandler at /
router.post('/',(req,res,next)=>{
    const test = new Test({
        _id: mongoose.Types.ObjectId(),
        msg: req.body.msg 
    });

    test
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Test was created',
            createdTest: {
                _id: result._id,
                msg: result.msg,
                request:{
                    type: 'GET',
                    url: "http://localhost:3000/test/"
                }
            } 
        });
    })
    .catch(err=>{
        console.log(err);
    });
});

// DELETE ReqHandler at /:testId 
router.delete('/:testId',(req,res,next)=>{
    const id = req.params.testId;
    Test.remove({_id: id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(201).json({message: "test deleted successfully"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });
});

// PATCH ReqHandler at /:testId
router.patch('/:testId',(req,res,next)=>{
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Test.update({_id: req.params.testId},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(
                 {
                    _id: result._id,
                    msg: result.msg,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/test"
                    }
            });
         }
    )
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;