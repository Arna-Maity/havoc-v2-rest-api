const mongoose = require('mongoose');
const redis = require('redis');
const Developer = require('../models/developer');
const Device = require('../models/device');

mongoose.connect(
  process.env.MONGO_URI,

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const redisClient = redis.createClient(6379);

module.exports = (req, res, next) => {
  //console.log(req.baseUrl);  // Testing
  if (req.baseUrl === '/about' && req.params.developerId !== undefined) {
    redisClient.exists(req.params.developerId, (err, result) => {
      if (result) {
        console.log('Fetching from Redis Data Store ...');
        redisClient.get(req.params.developerId, (err, result) => {
          res.status(200).json(JSON.parse(result));
        });
      } else {
        // Store to Redis Store.
        console.log('Fetching from DB...');
        Developer.findById(req.params.developerId)
          .select('_id fields')
          .exec()
          .then((result) => {
            //let gitApiUrl = "https://" + gitApiBase + dev.fields.gitApiUrlSpecifier;
            //console.log(gitApiUrl); // Testing

            redisClient.setex(
              result._id.toString(),
              3600,
              JSON.stringify(result.fields)
            );
          })
          .catch((err) => {
            console.log(err);
          });
        next();
      }
    });
  } else if (
    req.baseUrl === '/devices' &&
    req.params.deviceCode !== undefined
  ) {
    redisClient.exists(req.params.deviceCode, (err, result) => {
      if (result) {
        console.log('Fetching from Redis Data Store ...');
        redisClient.get(req.params.deviceCode, (err, result) => {
          res.status(200).json(JSON.parse(result));
        });
      } else {
        // Store to Redis Store.
        console.log('Fetching from DB...');
        Device.findOne({ 'fields.Codename': req.params.deviceCode })
          .select('_id fields')
          .exec()
          .then((result) => {
            //let gitApiUrl = "https://" + gitApiBase + dev.fields.gitApiUrlSpecifier;
            //console.log(gitApiUrl); // Testing
            redisClient.setex(
              result.fields.Codename,
              3600,
              JSON.stringify(result.fields)
            );
          })
          .catch((err) => {
            console.log(err);
          });
        next();
      }
    });
  } else {
    next();
  }
};
