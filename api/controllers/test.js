const mongoose = require('mongoose');
const Test = require('../models/test');

exports.getAllTests = (req,res,next)=>
{
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
}

exports.getReqTest = (req,res,next)=>
{
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

}

exports.postTest = (req,res,next)=>
{
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
}

exports.deleteReqTest = (req,res,next)=>
{
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
}

exports.patchReqTest = (req,res,next)=>{
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
}