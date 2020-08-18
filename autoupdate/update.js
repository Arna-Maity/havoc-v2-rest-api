const Developer = require('../api/models/developer');
const updateDeveloper = require('./models') ;
const fetch = require('node-fetch') ;
const mongoose = require('mongoose') ;

// SETUP CRON AND CALLING UPDATE FUNC
const cron = require('node-cron') ;
cron.schedule('0 0 * * *', updateDaily, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  }) ;

exports.getAllDevelopers = (req, res) => {
    


    // const usernames = [
    //     'ZeNiXxX',
    //     'Arna-Maity',
    //     'travarilo',
    //     'SKULSHADY',
    //     'ComicoTeam',
    //     'SyberHexen',
    //     'Jprimero15',
    //     'nuub1k',
    //     'SonalSingh18',
    //     'abhijit1998',
    //     'Blacksuan19',
    //     'SiddharthBharadwaj',
    //     'rishivyas1969',
    //     'vsasvipul0605'
    //    ]
    // console.log(usernames) ;
    // usernames.forEach( (username) => {
    //     getData('https://api.github.com/users/' + username)
    //     .then(data => {
    //         useData(data) ;
    //         // createData(data) ;  // <= WORKING
    //         updateData(data) ;  // <= WORKING
    //     })
    // }) ;
    // // deleteData() ;  // <= WORKING

    

    // updateDaily() ;

    updateDeveloper.find()
    .select('_id username main')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            dev: docs.map(doc => {
                return {
                    _id: doc._id,
                    username: doc.username,
                    main: doc.main
                }
            })
        }
        res.status(200).json(response) ;
    })
    .catch(err => {
        console.log(err) ;
    })
}

exports.getIdDeveloper = (req, res) => {
    updateDeveloper.find({username: req.params.developerUsername})
    .select('_id username main')
    .exec()
    .then(docs => {
        const response = docs.map(doc => {
            return {
                _id: doc._id,
                username: doc.username,
                main: doc.main
            }
        })
        
        console.log(docs) ;
        res.status(200).json(response) ;
    })
    .catch(err => {
        console.log(err) ;
    })
}

// FUNC RUNS DAILY ACC TO CRON SETUP
function updateDaily(){

    Developer.find()
    .then(docs => {
        docs.forEach(doc => {
            // console.log(doc.fields.Gitlink.slice(19, doc.fields.Gitlink.length)) ;
            const username = doc.fields.Gitlink.slice(19, doc.fields.Gitlink.length) ;

            getData('https://api.github.com/users/' + username)
            .then(data => {
                // useData(data) ;
                // console.log('--->' + doc.fields.Name + '<----') ;
                // createData(data) ;  // <= WORKING
                updateData(data, doc) ;  // <= WORKING
            })

        })
    })


    // const usernames = [
    //     'ZeNiXxX',
    //     'Arna-Maity',
    //     'travarilo',
    //     'SKULSHADY',
    //     'ComicoTeam',
    //     'SyberHexen',
    //     'Jprimero15',
    //     'nuub1k',
    //     'SonalSingh18',
    //     'abhijit1998',
    //     'Blacksuan19',
    //     'SiddharthBharadwaj',
    //     'rishivyas1969',
    //     'vsasvipul0605'
    //    ]
    // console.log(usernames) ;
    // usernames.forEach( (username) => {
    //     getData('https://api.github.com/users/' + username)
    //     .then(data => {
    //         useData(data) ;
    //         // createData(data) ;  // <= WORKING
    //         updateData(data) ;  // <= WORKING
    //     })
    // }) ;


    // Developer.find()
    // .select('fields')
    // .exec()
    // .then((docs) => {
    //     // const usernames = docs.map((docs) => {
    //     //         return docs.fields.Gitlink.slice(19, docs.fields.Gitlink.length)
    //     //     })
        
    //     // deleteData() ;  // <= WORKING
    // })
    // .catch((err) => {
    //     console.log(err) ;
    // })
}

// FETCH USER DATA FROM GITHUB API
async function getData(url){
    const result = await fetch(url, {
        method: 'GET'
    })
    .catch(err => {
        console.log(err) ;
    })
    return result.json() ;
}

// CREATE DEVELOPER DATA IN updateDeveloper
function createData(data){
    const updateDev = new updateDeveloper({
        _id: mongoose.Types.ObjectId(),
        username: data.login,
        main: {
            login: data.login,
            avatar_url: data.avatar_url,
            url: data.url,
            html_url: data.html_url,
            bio: data.bio
        }
    }) ;

    updateDev.save()
    .then(result => {
        console.log('----------DEV DATA SAVED---------------') ;
        console.log('_id: ' + result._id) ;
        console.log('main: ' + result.main) ;
        console.log('-----------------------------------') ;
    })
    .catch(err => {
        console.log(err) ;
    })
}

// UPDATE DEVELOPER DATA IN updateDeveloper
function updateData(gitData, aboutDoc){

    // console.log(aboutDoc._id) ;
    // useData(gitData) ;

    Developer.findOneAndUpdate(
        {_id: aboutDoc._id},
        {
            $set: {
                'fields.login': gitData.login,
                'fields.avatar_url': gitData.avatar_url,
                'fields.url': gitData.url,
                'fields.html_url': gitData.html_url,
                'fields.bio': gitData.bio
            }
        },
        (err, result) => {
            if(err) {
                console.log(err) ;
            }
            else{
                console.log('----------DEV DATA UPDATED---------------') ;
                console.log(result) ;
                console.log('-----------------------------------') ;
            }
        }
        )
        
    


    // const newMain = {
    //     login: data.login,
    //     avatar_url: data.avatar_url,
    //     url: data.url,
    //     html_url: data.html_url,
    //     bio: data.bio
    // }
    
    // const filter = {username: data.login  }
    // updateDeveloper.findOneAndUpdate(filter, {main: newMain}, {
    //     new: true,
    //     upsert: true // Make this update into an upsert
    //   },  (err, result) => {
    //     if(err) {
    //         console.log(err) ;
    //     }else{
    //         console.log('----------DEV DATA UPDATED---------------') ;
    //         console.log(result) ;
    //         console.log('-----------------------------------') ;
    //     }
    // })


}

// DELETE DEVELOPER DATA IN updateDeveloper
function deleteData(){
    updateDeveloper.remove({})
    .exec()
    .then(result => {
        console.log('------------DEV DATA DELETED------------') ;
    })
}

function useData(data){
    console.log('----------------------------------------------------') ;
    console.log('login     : ' + data.login) ;
    console.log('avatar_url: ' + data.avatar_url) ;
    console.log('url       : ' + data.url) ;
    console.log('html_url  : ' + data.html_url) ;
    console.log('bio       : ' + data.bio) ;
}