const mongoose = require('mongoose');
const Developer = require('../models/developer');

exports.getAllDevelopers = (req, res, next) => {
  Developer.find()
    .select('_id fields')
    .exec()
    .then((docs) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(docs);
      }
      const response = {
        count: docs.length,
        developers: docs.map((docs) => {
          return {
            _id: docs._id,
            fields: docs.fields,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/about/' + docs._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(err);
      }
      res.status(500).json({ error: err });
    });
};

exports.getReqDeveloper = (req, res, next) => {
  const id = req.params.developerId;
  Developer.findById(id)
    .select('_id fields')
    .exec()
    .then((result) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(result);
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(err);
      }
      res.status(500).json({ error: err });
    });
};

//exports.postDeveloper = (req,res,next)=>
//{
//    const developer = new Developer({
//        _id: mongoose.Types.ObjectId(),
//        msg: req.body.msg
//    });
//
//    developer
//    .save()
//    .then(result=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(result);
//            }
//        res.status(201).json({
//            message: 'Developer was created',
//            createdDeveloper: {
//                _id: result._id,
//                msg: result.msg,
//                request:{
//                    type: 'GET',
//                    url: "http://localhost:3000/about/"
//                }
//            }
//        });
//    })
//    .catch(err=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(err);
//            }
//    });
//}
//
//exports.deleteReqDeveloper = (req,res,next)=>
//{
//    const id = req.params.developerId;
//    Developer.remove({_id: id})
//    .exec()
//    .then(result=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(result);
//            }
//        res.status(201).json({message: "Developer deleted successfully"});
//    })
//    .catch(err=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(err);
//            }
//        res.status(500).json({error: err});
//    });
//}
//
//exports.patchReqDeveloper = (req,res,next)=>{
//    const updateOps = {};
//    for(const ops of req.body){
//        updateOps[ops.propName] = ops.value;
//    }
//    Developer.update({_id: req.params.developerId},{$set: updateOps})
//    .exec()
//    .then(result => {
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(result);
//            }
//        res.status(200).json(
//                 {
//                    _id: result._id,
//                    msg: result.msg,
//                    request: {
//                        type: 'GET',
//                        url: "http://localhost:3000/about"
//                    }
//            });
//         }
//    )
//    .catch(err=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(err);
//            }
//        res.status(500).json({
//            error: err
//        });
//    });
//}
//
