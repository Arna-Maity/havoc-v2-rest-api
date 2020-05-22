const mongoose = require('mongoose');
const Device = require('../models/device');

exports.getAllDevices = (req,res,next)=>
{
        Device.find()
    .select('_id fields')
    .exec()
    .then(docs=>{
        if(process.env.NODE_ENV !== 'production'){
        console.log(docs);
        }
        const response = {
            count: docs.length,
            devices: docs.map(docs=>{
                return {
                    _id: docs._id,
                    fields: docs.fields,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3000/device/'+docs.fields.Codename
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err=>{
        if(process.env.NODE_ENV !== 'production'){
            console.log(err);
            }
        res.status(500).json({error: err});
    });
}

exports.getReqDevice = (req,res,next)=>
{
    const code = req.params.deviceCode;
    Device.findOne({"fields.Codename": req.params.deviceCode})
    .select('_id fields')
    .exec()
    .then(result=>{
        if(process.env.NODE_ENV !== 'production'){
            console.log(result);
            }
        res.status(200).json(result);
    })
    .catch(err=>{
        if(process.env.NODE_ENV !== 'production'){
            console.log(err);
            }
        res.status(500).json({error: err});
    });

}

//exports.postDevice = (req,res,next)=>
//{
//    const device = new Device({
//        _id: mongoose.Types.ObjectId(),
//        msg: req.body.msg 
//    });
//
//    device
//    .save()
//    .then(result=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(result);
//            }
//        res.status(201).json({
//            message: 'Device was created',
//            createdDevice: {
//                _id: result._id,
//                msg: result.msg,
//                request:{
//                    type: 'GET',
//                    url: "http://localhost:3000/device/"
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
//exports.deleteReqDevice = (req,res,next)=>
//{
//    const id = req.params.deviceId;
//    Device.remove({_id: id})
//    .exec()
//    .then(result=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(result);
//            }
//        res.status(201).json({message: "Device deleted successfully"});
//    })
//    .catch(err=>{
//        if(process.env.NODE_ENV !== 'production'){
//            console.log(err);
//            }
//        res.status(500).json({error: err});
//    });
//}
//
//exports.patchReqDevice = (req,res,next)=>{
//    const updateOps = {};
//    for(const ops of req.body){
//        updateOps[ops.propName] = ops.value;
//    }
//    Device.update({_id: req.params.deviceId},{$set: updateOps})
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
//                        url: "http://localhost:3000/device"
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